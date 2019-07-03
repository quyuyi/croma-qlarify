import React, { Component } from 'react';


// label positive or neagtive
// click Next will add the label and the keywords
// selected by the user to the database
class Form extends Component {
    constructor(props){
        super(props);
        this.initialState={
            label:'',
        }
        this.state=this.initialState;
    }

    handleLabel(label){
        if (label==0){
            this.setState({
                label: 'neg',
            });
        }
        else {
            this.setState({
                label: 'pos',
            });
        }
    }

    // when user click Next button
    // set the state to initial
    submitForm=()=>{
        this.props.handleNext(this.state.label);
        this.setState(this.initialState);
    } 

    render () {
        return (
            <form>
                <input type="button" value="Positive" onClick={()=>this.handleLabel(1)}/>
                <input type="button" value="Negative" onClick={()=>this.handleLabel(0)}/>
                <input type="button" value="Next" onClick={()=>this.submitForm()}/>
            </form>
        );
    }
}

export default Form;