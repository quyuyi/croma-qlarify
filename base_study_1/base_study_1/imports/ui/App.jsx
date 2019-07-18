import React,{Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Examples from "../api/examples";
import Example from './Example.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      completed:0,
    };
  }


  handleNext=(id,label,rule)=>{
    console.log('call handleNext in App');
    console.log(id);
    console.log(label);
    console.log(rule);
    Examples.update(
      {_id:id},
      {$push:{rules: {
        label:label,
        rule:rule
        //worker:
        //createdAt:
      }}},
    );
    
    this.setState({
      completed: this.state.completed + 1,
    });
  
    this.forceUpdate();
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
        <Example id={id} example={text} handleNext={this.handleNext}/>
      );
    }
    else{
      var text='Congratulations! You have finished all the tasks.';
      return (
        <div>{text}</div>
      );
    }
    console.log(id);
  }




  render () {
    console.log('call render in App');
    return (
      <div className='collectRules'>
        <p>You are given 10 news descriptions. Please classify them into one of four categories:</p>
        <ul>World</ul>
        <ul>Business</ul>
        <ul>Sports</ul>
        <ul>SciTech</ul>
        <p>For each news, after determining its label, please specify a rule that would correctly classify this example. A rule is a pattern you used to classify the news, and can be used to classify other news that share the same pattern. </p>
        <p>Please specify it in the following format:</p>
        <p>If news [satisfies pattern X], then it falls in [category Y]. </p>
        <div>{this.renderExample()}</div>  
      </div>
    );
  }


}

export default exampleContainer = withTracker(()=>{
  return{
    examples: Examples.find({}).fetch(),
  };
})(App);
