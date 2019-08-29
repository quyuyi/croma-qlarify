import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import History from "./history.jsx";
import DataTable from './table.jsx';
import Split from './split.jsx';

class Condition4 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){

      return (
        <div>
            <Container>
                <Row>
                    <Col sm md={3}>
                        <Split />
                    </Col>
                    <Col sm md={6}>
                        <DataTable />
                    </Col>
                    <Col sm md={3}>
                        <History />
                    </Col>
                </Row>
            </Container>
            
            
        </div>
      );
  }
}

export default Condition4;

