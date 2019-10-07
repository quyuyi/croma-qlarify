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
          <h2>
            <p>
              Imagine a scenario when a person is looking for a movie that he browsed on TMDB(The Movie DataBase) a week ago, but no longer remembers the title. You are given 60 possible movies and a list of questions based on the metadata of the movies (click dropdown to see the questions.)
            </p>
            <p>
              Some of the questions give useful answers, but may require knowledge that is hard to recall or not possessed by the end user. (ex. if we know the serial number of a computer, we know exactly what the computer is.)
            </p>
            <p>
            Some of the questions are easy to answer but not so useful. (ex. whether or not the computer has a screen)
            </p>
            <p>
              Can you make the trade-off and select a question that is easy to answer, but also provides the most information to narrow down the possible movies? 
            </p>
            <p>
              We will review your response, and will give a bonus of $0.3 if you asked an easy to answer yet useful question that largely reduces the number of movies.
            </p>
          </h2>
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

