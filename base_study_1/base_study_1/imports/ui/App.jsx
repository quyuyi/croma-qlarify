import React,{Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Examples from "../api/examples";
import Example from './Example.jsx';
import Form from './Form.jsx';

/*
MONGO_URL=mongodb://user1:user111@ds351987.mlab.com:51987/heroku_vbl2phnb
mongodb://heoruku_vbl2phnb:bl5f4lvnkq760kbt0qmbgim99v@ds351987.mlab.com:51987/heroku_vbl2phnb
*/
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      status:'on',
      examples:[],
    };
  }

  handleSubmit(){
    console.log('handleSubmit in App');
    console.log(this.props.examples);
    this.props.examples.map(function(e){
      document.getElementById(e._id).submit();
    });
    this.setState({
      status:'done',
    });
  }

  renderExample(){
    console.log(this.props.examples);
    return this.props.examples.map(e=>(
      <Example key={e._id} id={e._id} example={e.text}/>
    ));
  }

  render () {
    console.log('call render in App');
    if (this.state.status=='on'){
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
          <Form handleSubmit={this.handleSubmit}/>
        </div>
      );
    }
    else {
      return (
        <div>Thank you for participating.</div>
      );
    }
  }


}

export default exampleContainer = withTracker(()=>{
  return{
    examples: Examples.find({}).fetch(),
  };
})(App);