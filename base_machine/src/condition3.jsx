import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import History from "./history.jsx";
import DataTable from './table.jsx';
import Entropy from './entropy.jsx';
import Ask from './ask.jsx';
import TableNoFilter from './tablenofilter.jsx';
import ChatHistory from "./chathistory.jsx";

const round=3;

class Condition3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: [],
            loading: true,
        };
    
        this.myCallback = this.myCallback.bind(this);
        this.fetchData = this.fetchData.bind(this);    
    }
    
      
    componentDidMount() {
        this.fetchData();
    }

    renderInstruction() {
        return (
          <div>
          <div className='questions-header'>
              <h2>
                <p>
                  Imagine a scenario when a person is looking for a movie that he browsed on TMDB(The Movie DataBase) a week ago, but no longer remembers the title. You are given 60 possible movies and a list of questions based on the metadata of the movies (click dropdown to see the questions.)
                </p>
                <p>
                  Some of the questions give useful answers, but may require knowledge that is hard to recall or not possessed by the end user. (ex. if we find out the serial number of a computer, we know exactly what the computer is.)
                </p>
                <p>
                Some of the questions are easy to answer but not so useful. (ex. whether or not the computer has a screen)
                </p>
                <p>
                  Can you make the trade-off and select a question that is easy to answer, but also provides the most information to narrow down the possible movies? 
                </p>
                <p>
                To help you, we ranked the questions by how useful the expected answers are. We attached a score for each question, the higher the score, the more useful. Please go down the ranking and choose one that is most useful but also easy to answer.
                </p>
                <p>
                  We will review your response, and will give a bonus of $0.3 if you asked an easy to answer yet useful question that largely narrows down the number of movies.
                </p>
              </h2>
          </div>
          </div>
        );
    }

    fetchData() {
        fetch('/render_features/', { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((data) => {
                // console.log('printing from fetchData in rules.jsx');
                // console.log(data.rules);
                this.setState({
                    rules: data.rules,
                    loading: false,
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    myCallback(dataFromChild){
        // console.log("print from myCallback in hybrid.jsx");
        // console.log(dataFromChild);
        this.setState({
            rules: dataFromChild,
            loading: false,
        });
    }


  render(){
      return (
        <div>
            <Container>
                {this.renderInstruction()}
                <Row>
                    <Col sm md={3}>
                        <Entropy 
                        rules={this.state.rules} 
                        loading={this.state.loading}
                        />
                    </Col>
                    <Col sm md={6}>
                        <TableNoFilter 
                        callbackFromParent={this.myCallback} 
                        checkFinishLoading={this.props.checkFinishLoading}
                        />
                    </Col>
                    <Col sm md={3}>
                        {/* <ChatHistory
                        />
                        <br></br>
                        <header>
                            <p className='head'>Select Next Question to Ask</p>
                        </header> */}
                        <Ask
                        startTime={this.props.startTime}
                        condition='entropy'
                        />
                    </Col>
                </Row>
            </Container>
            
            
        </div>
      );
  }
}

export default Condition3;

