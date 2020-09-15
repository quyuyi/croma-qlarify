import React from 'react';
import Button from 'react-bootstrap/Button';
import TableNoFilter from "./tablenofilter.jsx";

const options = [{"id": 1, "feature": "what is the id", "entropy": 10.0, "rank": 1}, {"id": 2, "feature": "what is the imdb id", "entropy": 9.99903526098446, "rank": 2}, {"id": 3, "feature": "what is the poster path", "entropy": 9.951659214767707, "rank": 3}, {"id": 4, "feature": "name a main character", "entropy": 8.681619040973489, "rank": 4}, {"id": 5, "feature": "who is the director", "entropy": 8.538714850522197, "rank": 5}, {"id": 6, "feature": "name a main cast", "entropy": 8.323220986374375, "rank": 6}, {"id": 7, "feature": "name a production company", "entropy": 6.899768037733951, "rank": 7}, {"id": 8, "feature": "name a keyword listed on TMDB", "entropy": 6.226147892264789, "rank": 8}, {"id": 9, "feature": "what is the tagline", "entropy": 4.762238250154396, "rank": 9}, {"id": 10, "feature": "what is the release date range (A.before 1980,B.1980-1990,...,E.>2010)", "entropy": 3.765116874947182, "rank": 10}, {"id": 11, "feature": "who is the screenplay", "entropy": 3.392864359336299, "rank": 11}, {"id": 12, "feature": "name a production country", "entropy": 2.2821973582236765, "rank": 12}, {"id": 13, "feature": "name a spoken language", "entropy": 1.886305873911186, "rank": 13}, {"id": 14, "feature": "what is the homepage", "entropy": 1.857562757056457, "rank": 14}, {"id": 15, "feature": "name a genre", "entropy": 1.8162285974649153, "rank": 15}, {"id": 16, "feature": "what is the original language", "entropy": 1.3787059670243418, "rank": 16}, {"id": 17, "feature": "what is the runtime range (A.0-90min,B.200-400mil,...,E.>150min)", "entropy": 1.2190365403337091, "rank": 17}, {"id": 18, "feature": "what is the vote average range (A.0-2,B.2-4,...,E.8-10)", "entropy": 1.1027614918447388, "rank": 18}, {"id": 19, "feature": "what collection it belongs to", "entropy": 0.95743488041117, "rank": 19}, {"id": 20, "feature": "what is the popularity range (A.0-10,B.10-20,...,F.>50)", "entropy": 0.24910960271218396, "rank": 20}, {"id": 21, "feature": "what is the budget range (A.0-50mil, B.50-100mil,...,F.>250mil)", "entropy": 0.13132676109011207, "rank": 21}, {"id": 22, "feature": "what is the revenue range (A.0-200mil,B.200-400mil,...,F.>1000mil)", "entropy": 0.0852187485828623, "rank": 22}, {"id": 23, "feature": "vote_count", "entropy": 0.06585973614678141, "rank": 23}, {"id": 24, "feature": "what is the status", "entropy": 0.06206913313384368, "rank": 24}, {"id": 25, "feature": "does it have videos", "entropy": 0.012910327014149446, "rank": 25}, {"id": 26, "feature": "is it only for adults", "entropy": -0.0, "rank": 26}];

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            startTime: new Date(),
        };
    }


    componentDidMount() {}


    handleNext() {
        this.setState({stage: this.state.stage+1});
    }

    checkAns(){
        let reasoning = document.getElementById('reasoning').value;
        let radios = document.getElementsByName('feature');
        var selectedFeature = '';
        for (let i = 0; i < radios.length; i++){
            if (radios[i].checked){
                selectedFeature = radios[i].value;
                break;
            }
        }
        if(selectedFeature == '') {
            alert("please choose one question by checking the box in the table.")
        } else if(reasoning == '') {
            alert("Please explain why do you think it’s easy-to-answer and informative.")
        } else {
            console.log("the feature selected by the user is ", selectedFeature);
            let timeTaken = (new Date() - this.state.startTime)/1000;
            this.props.handleSubmit(selectedFeature, reasoning, timeTaken);
        }
    }


    renderRealQuestion() {
        return(
            <div>
                <h5><p>Task</p></h5>
                <p>Please select an <b>easy-to-answer</b> and <b>informative</b> question by <b>checking a box in the table below</b>. Also, explain why think it’s easy-to-answer and informative in the input box. We will review your response and approve the qualified responses.</p>
                <textarea className="form-control" id="reasoning" rows="3"
                    placeholder="Explain why you think it’s easy-to-answer and informative"></textarea>
            </div>
        );
    }


    render(){
        if (this.state.stage == 0){
            return (
                <div>
                    <div className='questions-header'>
                        {this.renderRealQuestion()}
                    </div>
                    <TableNoFilter checkFinishLoading={this.props.checkFinishLoading}/>
                    <Button block variant="secondary" onClick={()=>this.checkAns()} >Next</Button>
                </div>
            );
        }
    }


}

export default Test;