import React, { Component } from 'react';

class Form extends Component {
    render (){
        console.log('render in Form');
        return (
            <input type='button' value='Submit' onClick={()=>this.props.handleSubmit()} />
        );
    }
}

export default Form;