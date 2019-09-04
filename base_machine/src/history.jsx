import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            histories:[],
            selectedOption: null,
            startTime: null,
            first: true,
        };
    }

    componentWillMount() {
    }


    postData(url = '', data = {}) {
    // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }
    
    handleSubmit() {
        let startTime;
        if (this.state.first){
            startTime=this.props.startTime;
            this.setState({
                first: false,
            })
        }
        else {
            startTime=this.state.startTime;
        }
        const endTime=new Date().getTime();
        let responseTime=endTime-startTime;
        console.log("Time used to ask this question is: ");
        console.log(responseTime);
        let question=this.state.selectedOption;

        // how to filter open-ended questions?
        this.postData('/fetch_condition1/', {question:question, responseTime:responseTime}) 
        .then(data => {
            console.log(data.answer)
            setTimeout(() => {
                this.setState({
                    // set start Time for the next question
                    startTime: new Date().getTime(),
                    histories:[...this.state.histories,
                        {'question':question,'answer':data.answer}],
                });
            }, data.answer[1]*1000);
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
        // document.getElementById('question').value='';
    }

    handleChange(e) {
        console.log(e)
        this.setState({ selectedOption : e.value });
      };
    
    render(){
        
        const options = [
            { value: 'id', label: 'id' },
            { value: 'imdb_id', label: 'imdb id' },
            { value: 'title', label: 'title' },
            { value: 'belongs_to_collection', label: 'belongs to collection' },
            { value: 'budget', label: 'budget' },
            { value: 'genres', label: 'genres' },
            { value: 'homepage', label: 'homepage' },
            { value: 'original_language', label: 'original language' },
            { value: 'original_title', label: 'original title' },
            { value: 'overview', label: 'overview' },
            { value: 'popularity', label: 'popularity' },
            { value: 'poster_path', label: 'poster path' },
            { value: 'production_companies', label: 'production companies' },
            { value: 'production_countries', label: 'production countries' },
            { value: 'release_date', label: 'release date' },
            { value: 'revenue', label: 'revenue' },
            { value: 'runtime', label: 'runtime' },
            { value: 'spoken_languages', label: 'spoken languages' },
            { value: 'status', label: 'status' },
            { value: 'tagline', label: 'tagline' },
            { value: 'video', label: 'video' },
            { value: 'vote_average', label: 'vote average' },
            { value: 'vote_count', label: 'vote count' },
            { value: 'adult', label: 'adult' },
          ]

        return (
            <div>
                <header>
                    <p className='head'>Chat History</p>

                    <Select
                        onChange={this.handleChange.bind(this)}
                        options={options}
                    />
                    <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Ask</Button>
                </header>

                <div className='history'>
                    {this.state.histories.map((h,idx) => {
                        return (
                            <div key={idx}>
                                <Badge variant="light">Question</Badge> {h.question} <br/>
                                <Badge variant="secondary">Answer</Badge> {h.answer[0]}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default History;