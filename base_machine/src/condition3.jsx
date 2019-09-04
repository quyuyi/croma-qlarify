import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import History from "./history.jsx";
import DataTable from './table.jsx';
import Entropy from './entropy.jsx';
import { isThisSecond } from "date-fns";

class Condition3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: [],
            loading: true,
            startTime: null,
        };
    
        this.myCallback = this.myCallback.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.checkFinishLoading = this.checkFinishLoading.bind(this);
    
    }
    
      
    componentDidMount() {
        this.fetchData();
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
            loading: true,
        });
    }

    // set the start time for the first question
    // when the table is fully loaded
    checkFinishLoading(loading){
        if (!loading){
            this.setState({
                startTime: new Date().getTime(),
            });
        }
    }

  render(){
      return (
        <div>
            <Container>
                <Row>
                    <Col sm md={3}>
                        <Entropy 
                        rules={this.state.rules} 
                        loading={this.state.loading}
                        />
                    </Col>
                    <Col sm md={6}>
                        <DataTable 
                        callbackFromParent={this.myCallback} 
                        checkFinishLoading={this.checkFinishLoading}
                        />
                    </Col>
                    <Col sm md={3}>
                        <History
                        startTime={this.state.startTime} 
                        />
                    </Col>
                </Row>
            </Container>
            
            
        </div>
      );
  }
}

export default Condition3;

