import React from 'react';
import ReactDOM from 'react-dom';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            histories:[
                {
                    'question':'question',
                    'answer':'answer',
                },
            ],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
        let question=document.getElementById('question').value;
        // how to filter open-ended questions?
        this.postData('/fetch_condition1/', {question:question}) 
        .then(data => {
            console.log(data)
            // TODO
            // add (feature,value) pair to history
            this.setState({
                histories:[...this.state.histories,
                    {'question':question,'answer':data.answer}],
            });
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
        document.getElementById('question').value='';
    }        
    

    render(){
        return (
            <div className='history'>
                <header>
                    <h1>Interaction History</h1>

                    <input 
                    id='question'
                    type='text' 
                    ref='textInput'
                    placeholder='Type your question here.'></input>
                    <button 
                    onClick={()=>this.handleSubmit()}>Submit</button>
                </header>

                
                {this.state.histories.map((h,idx) => {
                    return (
                        <ul key={idx}>
                            {h.question}:{h.answer}
                        </ul>
                    )
                })}
                
            </div>
        );
    }
}

export default History;