import React, { Component } from 'react';

class Example extends Component {
  constructor(props){
    super(props);
    this.initialState={
      label:'',
      rule:'',
    };
    this.state=this.initialState;
    this.handleLabel=this.handleLabel.bind(this);
    this.handleRule=this.handleRule.bind(this);
  }

  handleNextExample(){
    console.log('call handleNextExample in Example');
    //verify input presence
    if (this.state.label==''){
      alert("Please choose a label.");
    }
    else if (this.state.rule==''){
      alert("Please write a rule.");
    }

    else {
      this.props.handleNext(this.props.id,this.state.label,this.state.rule);
      //clear form
      document.getElementById('rule').value='';
      //uncheck label
      document.getElementById("radioBtn1").checked = false;
      document.getElementById("radioBtn2").checked = false;
      document.getElementById("radioBtn3").checked = false;
      document.getElementById("radioBtn4").checked = false;
      this.setState(this.initialState);
    }
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
      <div className='div1'>
        <p>{this.props.count}/10</p>
        <p>{this.props.example}</p>  
        <form>      
          <input type='radio' name='label' id='radioBtn1' value='World' onClick={this.handleLabel}/>World<br></br>
          <input type='radio' name='label' id='radioBtn2'value='Business' onClick={this.handleLabel}/>Business<br></br>
          <input type='radio' name='label' id='radioBtn3' value='Sports' onClick={this.handleLabel}/>Sports<br></br>
          <input type='radio' name='label' id='radioBtn4' value='SciTech' onClick={this.handleLabel}/>SciTech<br></br>
          <br></br>
          <textarea
            type='text'
            id='rule'
            placeholder='type your rule here'
            onChange={this.handleRule}
          />
          <br></br>                
          <input className='button' type='button' value='Next' onClick={()=>this.handleNextExample()} />
        </form>  
      </div>

      
    );
  }
}

export default Example;