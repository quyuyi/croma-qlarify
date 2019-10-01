import React from 'react';
import Badge from 'react-bootstrap/Badge';

class ChatHistory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            histories: [
                {'question': 'genre', 'answer': 'Action', 'time': 3},
                {'question': 'imdb_id', 'answer': "I don't know.", 'time': 10},
            ]
        };
    }

    componentDidMount() {
    }

    render(){
        return (
            <div>
                <header>
                    <p className='head'>Chat History</p>
                </header>
                <div className='history'>
                    {this.state.histories.map((h,idx) => {
                        return (
                            <div key={idx}>
                                <Badge variant="light">Question</Badge> {h.question} <br/>
                                <Badge variant="secondary">Answer</Badge> {h.answer} <br/>
                                <Badge variant="secondary">Time</Badge> The end user takes {h.time} seconds to answer.<br/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ChatHistory;