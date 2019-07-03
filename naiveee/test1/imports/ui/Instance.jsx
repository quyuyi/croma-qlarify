import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Instances from '../api/instances.js';
import Heuristics from '../api/heuristics.js';
import Form from './Form.jsx';


// highlight keyword
// keywords will be passed to Form for submission
class Instance extends Component {
    constructor(props){
        super(props);
        this.initialState={
            keywords: [],
        };
        this.state=this.initialState;
    }

    // get the keywords that a user selected
    handleMouseup(e){
        e.preventDefault();
        var t=document.getSelection();
        document.getElementById('keyword').value=t;
        // ReactDOM.findDOMNode(this.refs.keyword).value=t;
    }

    handleAddKeyword(){
       this.setState({
            keywords:[...this.state.keywords,document.getElementById('keyword').value],
        });
        document.getElementById('keyword').value='';
    }

    // when user click next button
    // set the record of keywords to empty
    handleNextInstance=(label)=>{
        this.props.handleNext(this.props.id,label,this.state.keywords);
        var length=this.state.keywords.length;
        for (var i=0; i<length; i++){
            Heuristics.insert({
                heuristic: this.state.keywords[i],
                label: label,
            });
        }
        this.setState(this.initialState);
    }

    render () {
        return (
            <div>
                <p className="text" onMouseUp={this.handleMouseup}>{this.props.instance}</p>
                <input type="text" id="keyword"/>
                <input type="button" value="Add keyword" onClick={()=>this.handleAddKeyword()}/>
                <Form handleNext={this.handleNextInstance}/>
            </div>
        );

    }
}

export default Instance;