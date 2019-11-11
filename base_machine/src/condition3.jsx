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
import Button from 'react-bootstrap/Button';

const round=3;

class Condition3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: [],
            loading: true,
            showTutorial: false
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
                    Your task is to select an easy-to-answer and informative question.
                </p>
                <p>
                    You will go through a tutorial first to learn what easy-to-answer and informative mean.
                </p>
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

    startTutorial() {
        this.setState({
            showTutorial: true,
        });
    }

    renderTutorial(){
        if(this.state.showTutorial) {
            return(
                <div>
                    <Row>
                    <Col>
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
                    <Row>
                    {/* <Col sm md={6}>
                        <TableNoFilter 
                        callbackFromParent={this.myCallback} 
                        checkFinishLoading={this.props.checkFinishLoading}
                        />
                    </Col> */}
                    <Col>
                        <Entropy 
                        rules={this.state.rules} 
                        loading={this.state.loading}
                        />
                    </Col>
                    </Row>
                </div>
            )
        } else {
            return(
                <div>
                    <Button variant="secondary" onClick={()=>this.startTutorial()} block>Start Tutorial</Button>
                </div>
            )
        }
    }
    


  render(){
      return (
        <div>
            <Container>
                {this.renderInstruction()}
                {this.renderTutorial()}
            </Container>
            
            
        </div>
      );
  }
}

export default Condition3;

