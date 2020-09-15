import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

const optionAB = [{value:"A", label: "A"}, {value: "B", label: "B"}];

class Tutorial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTest: true,
            tutorialAns1: '',
            tutorialAns2: '',
            stage: 0,
            tutorialTrial: 1,
        };
        this.checkAns = this.checkAns.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
    }


    checkAns() {
        if(this.state.tutorialAns1 != 'A' && this.state.tutorialAns2 != 'B'){
            alert("Wrong answer for both questions.\n\n'What is the id of the movie' is more informative because it has a higher informativeness score shown in the table.\n\n'What is the spoken language of the movie' is the easier-to-answer question, because the spoken language of the movie is easy to remember and say.");
            this.setState({tutorialTrial: this.state.tutorialTrial+1,})
        } 
        else if (this.state.tutorialAns1 != 'A') {
            alert("Wrong answer for the first question.\n\n'What is the id of the movie' is more informative because it has a higher informativeness score shown in the table.");
            this.setState({tutorialTrial: this.state.tutorialTrial+1,})
        }
        else if (this.state.tutorialAns2 != 'B') {
            alert("Wrong answer for the second question.\n\n'What is the spoken language of the movie' is the easier-to-answer question, because the spoken language of the movie is easy to remember and say.");
            this.setState({tutorialTrial: this.state.tutorialTrial+1,})
        }
        else {
            this.props.handleNextStage();
            console.log("pass tutorial, set state to test...")
        }
    }


    renderDefinitions() {
        return (
            <div id='definition'> 
                <h5><p>Tutorial</p></h5>
                <p>A question is easy-to-answer if the information required to answer the question is <b>easy for a person to remember and say</b>.</p>
                <p>A question is more informative if the answer of it can filter out more wrong possibilities.</p>
            </div>
        );
    }


    renderTestQuestion() {
        return(
            <div>
                <p>Please answer the following 2 questions to pass the tutorial.</p>
                <p>Among the questions below:</p>
                    <ul>
                        <li>A.What is the id of the movie</li>
                        <li>B.What is the spoken language of the movie</li>
                    </ul>
                <p>Enter the more informative question (A or B)</p>
                <Select id='testQuestionHelp' className='select' options={optionAB}
                    onChange={e => {this.setState({tutorialAns1: e.value,})}}/>

                <p>Enter the easier-to-answer question (A or B)</p>
                <Select id='testQuestionEasy' className='select' options={optionAB}
                    onChange={e => {this.setState({tutorialAns2: e.value,})}}/>
            </div>
        );
    }


    handleNext() {
        this.setState({stage: this.state.stage+1});        
    }


    render(){
        if (this.state.stage == 0){ //show definition of 'informative' and 'easy-to-answer'
            return (
                <div>
                    <br></br>
                    <div className='questions-header'>
                    {this.renderDefinitions()}
                    </div>
                    <Button block variant="secondary" id='next' onClick={()=>this.handleNext()} >Next</Button>
                </div>
            );
        }
        else if (this.state.stage == 1){ //show test question
            return (
                <div>
                    <br></br>
                    {this.renderDefinitions()}
                    <div className='questions-header'>
                    {this.renderTestQuestion()}
                    </div>
                    <Button block variant="secondary" onClick={()=>this.checkAns()} >Next</Button>
                </div>
            );
        }
    }
}

export default Tutorial;