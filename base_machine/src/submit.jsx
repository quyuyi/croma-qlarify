import React from "react";
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';

function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if(results == null)
	  return "";
	else return unescape(results[1]);
}

class Submit extends React.Component {
    constructor(){
        super();
        this.onSubmitHit = this.onSubmitHit.bind(this);
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


    submitHIT(result) {
        const condition=this.props.condition;
        console.log(condition);
        this.postData('/write_database/', {condition:condition ,result: result});

		console.log(result);
		$(document).ready(function(){
		  $("form#mturk_form").submit();
		});
		console.log('submitting hit....')
    }


    onSubmitHit(){
        const workerId=gup("workerId");
        
        const result={
            'workerId': workerId,
            'movieIndex': this.props.movieIndex,
            'result': this.props.result,
        };
        console.log(result);
      
        this.submitHIT(result);
    }

    render(){
        console.log("print from render in submit.jsx");
        return (
            <div>
                <form id='mturk_form'>
                <Button variant="dark" onClick={this.onSubmitHit} block>Submit HIT</Button>
                </form>
            </div>
        );
    }
}

export default Submit;