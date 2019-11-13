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
            showTutorial: false,
            next: 0,
            showTable: false,
            selectTable: false,
        };
    
        this.myCallback = this.myCallback.bind(this);
        this.fetchData = this.fetchData.bind(this);    
        this.handleShowTable = this.handleShowTable.bind(this);
    }
    
      
    componentDidMount() {
        this.fetchData();
    }

    renderInstruction() {
        return (
          <div>
          <div id='instruction' className='questions-header'>
              <h5>
                  <p>Instruction</p>
              </h5>
                <p>
                    Your task is to select an easy-to-answer and informative question.
                </p>
                <p>
                    You will go through a tutorial first to learn what easy-to-answer and informative mean.
                </p>
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
        document.getElementById('instruction').className=''
        this.setState({
            showTutorial: true,
            showTable: true,
        });
    }

    renderTutorial(){
        if(this.state.showTutorial) {
            return(
                <div >
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
                        handleShowTable={this.handleShowTable}
                        />
                    </Col>
                    </Row>
                    {/* <Row> */}
                    {/* <Col sm md={6}>
                        <TableNoFilter 
                        callbackFromParent={this.myCallback} 
                        checkFinishLoading={this.props.checkFinishLoading}
                        />
                    </Col> */}
                    {/* <Col>
                        <Entropy 
                        rules={this.state.rules} 
                        loading={this.state.loading}
                        />
                    </Col>
                    </Row> */}
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

    handleShowTable(show, select){
        this.setState({
            showTable: show,
            selectTable: select,
        });
    }
    


  render(){
      if (this.state.showTable){
        return (
            <div>
                <Container>
                    {this.renderInstruction()}
                    {this.renderTutorial()}
                    <Row>
                    <Col>
                    <Entropy 
                    rules={this.state.rules} 
                    loading={this.state.loading}
                    select={this.state.selectTable}
                    />                   
                    </Col>
                    </Row>
                </Container>
            </div>
          );
      }
      else {
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
}

export default Condition3;

