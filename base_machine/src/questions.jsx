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
        "belongs_to_collection",
        "budget (For example, greater than $5,000,000)",
        "genres",
        "homepage",
        "original_language",
        "overview",
        "popularity",
        "poster_path",
        "production_companies",
        "production_countries",
        "release_date (For example, 2015-2016)",
        "revenue (For example, $1,000,000 - $2,000,000)",
        "runtime (For example, 100 minutes - 120 minutes)",
        "spoken_languages",
        "status",
        "tagline",
        "video",
        "vote_average",
        "vote_count",
        "adult (Is this movie R rated?)"
    ]

    return (
    <div>
        <p>Please provide the information you remember about the movie. You can provide a range if you don't remember the exact answer. Or if you are not sure or don't remember, please answer <i>I don't know</i>.</p>
        {questions.map((q,idx) => {
                return (
                    <div key={idx}>
                        {q} <input type="text" />
                    </div>
                )
        })}
        <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Submit HIT</Button>

    </div>
    );
  }
}

export default Questions;