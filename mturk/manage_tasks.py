import argparse

import boto3

# Replace URL here 
URLS = {
    'recognizer': 'https://foobar44.herokuapp.com/',
}

def read_key_file(argf):
    with open(argf) as f:
        key_id, access_key, *_ = f.read().split()

    return key_id.strip(), access_key.strip()

def main(args):
    if args.production:
        endpoint = 'https://mturk-requester.us-east-1.amazonaws.com'
    else:
        endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'

    key_id, access_key = read_key_file(args.keyfile)

    mturk = boto3.client('mturk',
       aws_access_key_id = key_id,
       aws_secret_access_key = access_key,
       region_name= 'us-east-1',
       endpoint_url = endpoint
    )

    if args.action == 'retrieve':
        print(mturk.list_assignments_for_hit(HITId=args.hit_id))
    else:
        print("Balance: " + mturk.get_account_balance()['AvailableBalance'])

        with open('question.xml', "r") as f:
            question = f.read()
        question = question.replace('REPLACEFLAG', args.url)

        new_hit = mturk.create_hit(
            Title = 'Annotate news with a rule',
            Description = 'Your task is to look at the news description and write a rule to label it correctly',
            Keywords = 'text, labeling, annotation',
            Reward = '0.15',
            MaxAssignments = 10,                 #Set so that up to 10 workers can complete the assignment
            LifetimeInSeconds = 172800,          #Set so that HIT will last for 48 hours
            AssignmentDurationInSeconds = 300,   #Set to 5 minutes to complete the assignment
            AutoApprovalDelayInSeconds = 3600,   #Set so that worker's assignments will be automatically approved after 48 hours (default)
            Question = question,
        )

        print("A new HIT has been created. You can preview it here:")
        if args.production:
            print("https://worker.mturk.com/mturk/preview?groupId=" + new_hit['HIT']['HITGroupId'])
        else:
            print("https://workersandbox.mturk.com/mturk/preview?groupId=" + new_hit['HIT']['HITGroupId'])
        print("HITID = " + new_hit['HIT']['HITId'] + " (Use to Get Results)")

        print("New Balance: " + mturk.get_account_balance()['AvailableBalance'])

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Manage HITs')
    parser.add_argument('action', type=str, default='post', help='post | retrieve')
    parser.add_argument('--url', type=str, default='', help='manually set url for posting')
    parser.add_argument('--preset_url', type=str, default='recognizer', help='preset urls for posting. Ex. recognizer, verifier_cage')
    parser.add_argument('--production', action='store_true', help='Use production. Use with care.')
    parser.add_argument('--keyfile', type=str, default='mykey.key', help='keyfile. Default: mykey.key')
    parser.add_argument('--hit_id', type=str, help='hit id (for retrieve)')

    args = parser.parse_args()
    if args.action not in ['post', 'retrieve']:
        raise Exception('Action not found!')

    if args.action == 'post':
        if len(args.url) < 7:
            args.url = URLS[args.preset_url]

    main(args)
