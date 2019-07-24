import React,{Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Examples from "../api/examples";
import Example from './Example.jsx';
import '../api/mturk.js';
import gup from '../api/mturk.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      completed:0,
    };
  }

  handleNext=(id,label,rule)=>{
    console.log('call handleNext in App');
    // console.log(id);
    // console.log(label);
    // console.log(rule);
    if (gup("workerId")!=''){
      var workerId=gup("workerId");
      console.log('workerId update');
      console.log(workerId);
      Examples.update(
        {_id:id},
        {$push:{rules: {
          label:label,
          rule:rule,
          worker: workerId,
          createdAt:new Date(),
        }}},
      );
    }
    else {
      console.log("no workerId update");
      Examples.update(
        {_id:id},
        {$push:{rules: {
          label:label,
          rule:rule,
          //worker: workerId,
          createdAt:new Date(),
        }}},
      );
    }

    this.setState({
      completed: this.state.completed + 1,
    });
  
    this.forceUpdate();
  }


  handleSubmit(){
    /*
    var form=document.getElementById('mturk_form');
    form.submit();
    */
    $(document).ready(function(){
      $("form#mturk_form").submit();
    });
  }


  renderExample(){
    const all=this.props.examples.map(e=>e);
    //console.log(all);
    console.log(this.state.completed);
    console.log('call renderExample in App');
    const currentExample=all[this.state.completed];
    if (currentExample!=undefined){
      var text=currentExample.text;
      var id=currentExample._id;
      return (
        <Example id={id} example={text} handleNext={this.handleNext} count={this.state.completed+1}/>
      );
    }
    else if (this.state.completed==10){
      var text='Congratulations! You have finished all the tasks.';
      document.getElementById('submit_mturk').hidden='';
      return (
        <div>
          <p>{text}</p>
        </div>
      );
    }
  }




  render () {
    console.log('call render in App');
    return (
      <div className='collectRules'>
        <script type='text/javascript' src='../api.mturk.js'></script>
        <p>You are given 10 news descriptions. Please classify them into one of four categories:</p>
        <ul>World</ul>
        <ul>Business</ul>
        <ul>Sports</ul>
        <ul>SciTech</ul>
        <p>For each news, after determining its category, please describe a pattern that can be used to classify more news into the same category. That is, if some other news (not necessarily have to be in the 10 shown) also follows this pattern, then the news will fall into the specified category.</p>
        <p>Please specify it in the following format:</p>
        <p>If news [satisfies pattern X], then it falls in [category Y]. </p>
        <div>{this.renderExample()}</div>  
        <form id='mturk_form'>
          <button className='btn btn-default' id='submit_mturk' hidden='hidden' onClick={()=>this.handleSubmit()}>Submit HIT</button>
        </form>
      </div>
    );
  }


}

export default exampleContainer = withTracker(()=>{
  return{
    examples: Examples.find({}).fetch(),
  };
})(App);

