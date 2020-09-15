import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

class Movies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedOption1: null,
        selectedOption2: null,
    };
  }

  handleSubmit() {
    console.log('submit')
  }

  render(){

    const movies = [
        "Toy Story",
        "Jumanji",
        "Copycat",
        "Othello",
        "Now and Then",
        "Wings of Courage",
        "Kids of the Round Table",
        "Friday",
        "Fair Game",
        "Up",
    ]

    return (
    <div>
        <h4>Select a movie you have watched over a year ago. </h4>
        
        {movies.map((m,idx) => {
                return (
                    <div key={idx}>
                        {m} <input type="radio" />
                    </div>
                )
        })}
        <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Submit</Button>

    </div>
    );
  }
}

export default Movies;