import { Meteor } from 'meteor/meteor';
import React,{Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Instance from './Instance.jsx';
import Form from './Form.jsx';
import Instances from '../api/instances';
import Heuristics from '../api/heuristics';
import {HTTP} from 'meteor/http';

// sample a instance to work with
class App extends Component {
  // when click next button
  // store the label and heuristics of this instance to the database
  handleNext=(id,label,keywords)=>{
    Instances.update(id,{
      $set: {heuristics: keywords, label: label}
    });
  
    // call python to calculate accuracy of the current model
    const url = "http://127.0.0.1:5000/";
    HTTP.call('GET',url,function(error,result){
      if(error){
        console.log(error);
      }
      if (result){
        console.log(result);
      }
    });

    this.forceUpdate(); 
  }

  // random sample a instance
  // show the text of the instance
  // get the id of the instance (for updating the collection later)
  renderInstance(){   
    
    const allInstances=this.props.instances.filter(instance =>       
      isNotIntersected(instance.text, this.props.existingHeuristics)
    );
      
    console.log(allInstances.length);

    const selected=allInstances[Math.floor(Math.random()*allInstances.length)];

    if (selected != undefined) {
      return (
        <Instance id={selected.id} instance={selected.text} handleNext={this.handleNext}/>
      );
    } else {
      // const text=Instances.find({_id:id}).fetch().map(t=>t.text);
      return (
        <div />
      );
    }
  }

  render () {
    return (
      <div className='label'>
        <h1>Label positive or negative</h1>
        <h1>Highlight Keywords</h1>
        <span>{this.renderInstance()}</span>
    </div>
    );
  }
}

// withTracker
// to use data from a Meteor collection inside a React component
export default InstContainer = withTracker(() => {
  const existingHeuristics=Heuristics.find().fetch().map(item=>item.heuristic);
  console.log(existingHeuristics);
  return {
      instances: Instances.find({ }).fetch(),
      existingHeuristics: existingHeuristics,
  };
})(App);


// how to use aggregate and sample directly from mongodb?
/*
export default InstContainer = withTracker(() => {
  return {
      // how to use aggregate([{$sample:{size:1}}])?
      instances: Instances.aggregate(
        [{$sample:{size:1}}]
      )
  };
})(App);
*/

function isNotIntersected(str, arr) {
  const intersection = arr.filter(e => str.includes(e));
  return intersection.length == 0
<<<<<<< HEAD
}


=======
}
>>>>>>> 74baa5f9a323ec5f53b98c6264f7fa5c50c73b76
