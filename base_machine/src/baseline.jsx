import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import History from "./history.jsx";
import Ask from './ask.jsx';
import DataTable from './table.jsx';
import TableNoFilter from "./tablenofilter.jsx";

class Baseline extends React.Component {

  constructor(props) {
    super(props);
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
              </h5>
          </div>
      </div>
    );
  }

  render(){

      return (
        <div>
            <Container>
                {this.renderInstruction()}
                <Row>
                    <Col md={9}>
                        <TableNoFilter
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

