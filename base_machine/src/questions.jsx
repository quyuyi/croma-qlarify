import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

class Questions extends React.Component {

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

    const questions = [
        "id",
        "imdb_id",
        "title",
        "belongs_to_collection",
        "budget",
        "genres",
        "homepage",
        "original_language",
        "original_title",
        "overview",
        "popularity",
        "poster_path",
        "production_companies",
        "production_countries",
        "release_date",
        "revenue",
        "runtime",
        "spoken_languages",
        "status",
        "tagline",
        "video",
        "vote_average",
        "vote_count",
        "adult"
    ]

    return (
    <div>
        {questions.map((q,idx) => {
                return (
                    <div key={idx}>
                        What is the {q} of the movie? <input type="text" />
                    </div>
                )
        })}
        <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Submit</Button>

    </div>
    );
  }
}

export default Questions;