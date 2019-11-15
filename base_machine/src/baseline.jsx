import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableNoFilter from "./tablenofilter.jsx";
import Button from 'react-bootstrap/Button';
import Tutorial from "./tutorial.jsx";
import Test from "./test.jsx";
import Entropy from "./entropy.jsx";
import Submit from "./submit.jsx";

class Baseline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      selected: '',
      reasoning: '',
      timeTaken: 0,
    };
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNextStage(){
    this.setState({stage: this.state.stage+1});
  }

  handleSubmit(selected, reasoning, timeTaken){
    this.setState({
      stage: this.state.stage+1,
      selected: selected,
      reasoning: reasoning,
      timeTaken: timeTaken
    });
  }

  // renderInstruction() {
  //   return (
  //     <div>
  //     <div className='questions-header'>
  //             <h5>
  //                 <p>Instruction</p>
  //               <p>
  //                 Imagine a scenario when a person is looking for a movie that he browsed on TMDB(The Movie DataBase) a week ago, but no longer remembers the title. 
  //               </p>
  //               <p>
  //                   The movie is one of the 60 movies on the left. 
  //               </p>
  //               <p>
  //                   Your task is to ask a question that is easy for the person to answer, but also gives you a helpful answer to find the movie.
  //               </p>
  //               <p>
  //                   You will be asked to go through a short tutorial first.
  //               </p>
  //             </h5>
  //         </div>
  //     </div>
  //   );
  // }

  renderInstruction() {
    const instructions = [
      "Your task is to select an easy-to-answer and informative question.",
      "You will go through a tutorial first to learn what easy-to-answer and informative mean."
    ]
    //instructions.slice(0,showItems).map()
    return(
      <div>
        <h5><p>Instruction</p></h5>
        {instructions.map((ins, idx) => {
          return (<div key={idx}><p>{ins}</p></div>);})}
      </div>);
  }


  renderSubmit(){
    let finalResult = {
        selected: this.state.selected,
        reasoning: this.state.reasoning,
        timeTaken: this.state.timeTaken,
        tutorialTrial: this.state.tutorialTrial,
    }
    console.log(finalResult);
    return (
        <div>
            <p>You have completed the task. Thank you!</p>
            <Submit
            movieIndex="where to get movie index?"
            result={finalResult}
            condition='human'
            /> 
        </div>
    );
  }


  render(){
    if (this.state.stage == 0){ // show instructions only
      return (
        <div>
          <Container>
            <Row><Col>
              <div className='questions-header'>
              {this.renderInstruction()}
              </div>
              <Button block variant="secondary" onClick={()=>this.handleNextStage()} >Next</Button>
            </Col></Row>
          </Container>     
        </div>
      );
    }
    else if (this.state.stage == 1){ // show tutorial
      return (
        <div>
          <Container>
            <Row><Col>{this.renderInstruction()}</Col></Row>
            <Row><Col><Tutorial handleNextStage={this.handleNextStage}/></Col></Row>
          </Container>
        </div>
      );
    }
    else if (this.state.stage == 2){ // show real task
      return(
        <Container>
          <Row><Col>{this.renderInstruction()}</Col></Row>
          <Row><Col>
            <Test handleSubmit={this.handleSubmit}
              checkFinishLoading={this.props.checkFinishLoading} />
            {/* <Col md={3}><Test /></Col>
            <Col md={9}><Entropy loading={false} select={true} entropy={false}/></Col> */}
          </Col></Row>
        </Container>
      );
    }
    else if (this.state.stage == 3){ // can submit HIT
      return(
        <Container>
          <Row><Col>{this.renderSubmit()}</Col></Row>
        </Container>
      );
    }
    // else{
    //   return (
    //     <div>
    //         <Container>
    //             {this.renderInstruction()}
    //             <Row>
    //                 <Col md={9}>
    //                     <TableNoFilter
    //                     checkFinishLoading={this.props.checkFinishLoading} />
    //                 </Col>
    //                 <Col md={3}>
    //                     <Ask
    //                     startTime={this.props.startTime}
    //                     condition='human' />
    //                 </Col>
    //             </Row>
    //         </Container>
            
    //     </div>
    //   );
  // }
}



}

export default Baseline;

