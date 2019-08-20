import React from 'react';
import ReactDOM from 'react-dom';

class Rules extends React.Component {

    constructor() {
        // Initialize mutable state
        super();
        this.state = {
          // Post data from server
          rules: [],
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch('/rules/', { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    rules: data.rules,
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
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
    let rules=document.getElementsByName('rules');
    let selected_rule;
    for (let i=0;i<rules.length;i++){
        if (rules[i].checked){
            selected_rule=rules[i].value;
            break;
        }
    }
    this.postData('/filter/', {feature:selected_rule}) //feature_value
    .then(data => {
            
        console.log(data)

    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
    }       


    render() {
    // console.log('in render in rules.jsx');
    // console.log(this.props.rules);
    // has results
        return( <div>
                    {this.state.rules.map((rule, idx) => {
                    return  <div key={idx}>
                                <input type='radio' name='rules' value={rule}></input>
                                {rule} 
                    </div>

                        // TODO: can only choose one
                })}
                    <button 
                    onClick={this.handleSubmit()}>Submit</button>
                </div> 
        );
    }

}

export default Rules;

//ReactDOM.render(<Rule />, document.getElementById('rule'));