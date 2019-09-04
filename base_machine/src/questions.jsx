import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Question from './question.jsx';
// import '../api/mturk.js';
// import gup from '../api/mturk.js';

class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedOption1: null,
        selectedOption2: null,
        questionId: 0,
        answers: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderEnd = this.renderEnd.bind(this);
  }

  handleSubmit() {
    // const workerId=gup("workerId");
    // console.log("workerId");
    // const result={
    //   'workerId': workerId,
    //   'answers': this.state.answers,
    // };
    console.log(this.state.answers);

    // TODO:
    // send result back to server
    // or to a database?

    console.log('submit from outside');
    $(document).ready(function(){
      $("form#mturk_form").submit();
    });
  }

  handleNext(question,answer,time){
    const record={
      'question': question,
      'answer': answer,
      'time': time,
    }

    const nextId=this.state.questionId+1;
    const previous=this.state.answers;
    this.setState({
      questionId: nextId,
      answers: [...previous,record],
    });
  }

  renderQuestion(){
    return (
      <Question
      questionId={this.state.questionId}
      handleNext={this.handleNext}
      />
    );
  }

  renderEnd(){
    return (
      <div>
        You've finished the task. Click submit to submit HIT.
        <br></br>
        <form id='mturk_form'>
          <Button variant="dark" onClick={this.handleSubmit} block>Submit HIT</Button>
        </form>
     </div>
    );
  }


  render(){
    return (
      <div className='questions'>
        <div className='questions-header'>
          <h2>Please provide the information you remember about the movie. You can provide a range if you don't remember the exact answer. Or if you are not sure or don't remember, please answer <i>I don't know</i>.</h2>
        </div>
        {(this.state.questionId==22/*questions.length*/) ? this.renderEnd() : this.renderQuestion()}
      </div>
    );

    // return (
    // <div>
    //     {questions.map((q,idx) => {
    //       if (q=='genres' || q=='status' || q=='original_language' || q=='spoken_languages'
    //       || q=='production_countries' || q=='adult' || q=='video'){
    //         const options=allOptions[q];
    //         return (
    //           <div key={idx}>
    //             What is the {q} of the movie?<Select name={q} options={options} />
    //           </div>
    //         );
    //       }
    //       else {
    //             return (
    //               <div key={idx}>
    //                   What is the {q} of the movie? <input id={q} type="text" />
    //               </div>
    //           );
    //       }
    //     })}
    //     <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Submit HIT</Button>

    // </div>
    // );
  }
}

export default Questions;