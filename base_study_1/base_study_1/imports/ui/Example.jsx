import React, { Component } from 'react';
import Examples from "../api/examples";

class Example extends Component {
  constructor(props){
    super(props);
    this.initialState={
      label:'choose a label',
      rule:'type your rule here',
    };
    this.state=this.initialState;
    this.handleLabel=this.handleLabel.bind(this);
    this.handleRule=this.handleRule.bind(this);
  }

  handleSubmit(){
    console.log('call handleSumbit in Example');
    Examples.update(
      {_id:this.props.id},
      {$push:{rules: {
        label:this.state.label,
        rule:this.state.rule
        //worker:
        //createdAt:
      }}},
    );
  }


  handleLabel(e){
    console.log(e.target.value);
    this.setState({
      label:e.target.value,
    });
  }


  handleRule(e){
    console.log(e.target.value);
    this.setState({
      rule:e.target.value,
    });
  }


  render(){
    console.log('call render in Example');
    return (
      <div>
        <p>{this.props.example}</p>     
        <form id={this.props.id} onSubmit={()=>this.handleSubmit.bind(this)}>
          <input type='radio' name='label' id='radioBtn1' value='World' onClick={this.handleLabel}/>World<br></br>
          <input type='radio' name='label' id='radioBtn2'value='Business' onClick={this.handleLabel}/>Business<br></br>
          <input type='radio' name='label' id='radioBtn3' value='Sports' onClick={this.handleLabel}/>Sports<br></br>
          <input type='radio' name='label' id='radioBtn4' value='SciTech' onClick={this.handleLabel}/>SciTech<br></br>
          <br></br>
          <textarea
            type='text'
            id='rule'
            placeholder={this.state.rule}
            onChange={this.handleRule}
          />
        </form>
          <br></br>
          <br></br>
      </div>

      
    );
  }
}

export default Example;
