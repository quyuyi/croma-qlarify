import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Question from './question.jsx';
import Submit from './submit.jsx';


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedOption1: null,
        selectedOption2: null,
        questionId: 0, //0-based
        answers: [],
        start: false,
    };
    // this.onSubmitHit = this.onSubmitHit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderEnd = this.renderEnd.bind(this);
  }

  // onSubmitHit() {
  //   const result={
  //     'workerId': this.props.workerId,
  //     'movieIndex': this.props.movieIndex,
  //     'answers': this.state.answers,
  //   };
  //   console.log(this.state.answers);

  //   this.props.submitHIT(result);
  // }

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
    console.log("print from renderEnd in questions.jsx");
    return (
      <div>
        You've finished the task. Click submit to submit HIT.
        <br></br>
        <Submit
        movieIndex={this.props.movieIndex}
        result={this.state.answers}
        condition='end_user'
        />
        {/* <form id='mturk_form'>
          <Button variant="dark" onClick={this.onSubmitHit} block>Submit HIT</Button>
        </form> */}
     </div>
    );
  }

  renderInstruction(){
    return (
      <div className='questions-header'>
      <h2>
      Please Answer questions about <strong>{this.props.movieIndex}</strong>
      <br></br>
      For part 2, please provide what you remember about the movie for each metadata. If you don’t remember exactly, you can provide a range. (an example answer to movie runtime could be: more than 100 minutes, or in the range of 80 - 120 minutes. But please don’t answer around "100 minutes", because then we don’t know what the range is.)
      <br></br>
      It is fine that if you don’t know the information about a metadata, or if you don't understand what a metadata means. Please write “I don’t know” if you don’t know.
      </h2>
      </div>
    );
  }

  onStart() {
		this.setState({start: true});
	}

  render(){
    // render question one at a time
    if (this.state.start){
      return (
        <div className='questions'>
          {this.renderInstruction()}
          {(this.state.questionId==13/*questions.length*/) ? this.renderEnd() : this.renderQuestion()}
        </div>
      );
    }
    else {
      return (
        <div>
          {this.renderInstruction()}
          <Button variant="dark" onClick={this.onStart.bind(this)} block>Start</Button>
        </div>
      );
    }

    // render all questions at a time
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