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
              <h5>
                  <p>Instruction</p>
                <p>
                  Imagine a scenario when a person is looking for a movie that he browsed on TMDB(The Movie DataBase) a week ago, but no longer remembers the title. 
                </p>
                <p>
                    The movie is one of the 60 movies on the left. 
                </p>
                <p>
                    Your task is to ask a question that is easy for the person to answer, but also gives you a helpful answer to find the movie.
                </p>
                <p>
                    You will be asked to go through a short tutorial first.
                </p>
                {/* <p>
                To help you, we ranked the questions by how useful the expected answers are. We attached a score for each question, the higher the score, the more useful. Please go down the ranking and choose one that is most useful but also easy to answer.
                </p>
                <p>
                  We will review your response, and will give a bonus of $0.2 if you asked an easy to answer yet useful question that largely narrows down the number of movies.
                </p> */}
              </h5>
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
                    <Col sm md={6}>
                        <TableNoFilter 
                        callbackFromParent={this.myCallback} 
                        checkFinishLoading={this.props.checkFinishLoading}
                        />
                    </Col>
                    <Col sm md={3}>
                        <Entropy 
                        rules={this.state.rules} 
                        loading={this.state.loading}
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

