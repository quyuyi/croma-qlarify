import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import History from "./history.jsx";
import Ask from './ask.jsx';
import DataTable from './table.jsx';

class Baseline extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

      return (
        <div>
            <Container>
                <Row>
                    <Col md={9}>
                        <DataTable
                        checkFinishLoading={this.props.checkFinishLoading} />
                    </Col>
                    <Col md={3}>
                        <Ask
                        startTime={this.props.startTime}
                        condition='human' />
                    </Col>
                </Row>
            </Container>
            
        </div>
      );
  }
}

export default Baseline;

