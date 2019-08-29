import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Questions from './questions.jsx';
import Movies from './movies.jsx'

class Enduser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedOption1: null,
        selectedOption2: null,
    };
  }

  handleChange1(e) {
    console.log(e)
    this.setState({ selectedOption1 : e.value });
  };
  handleChange2(e) {
    console.log(e)
    this.setState({ selectedOption2 : e.value });
  };

  handleSubmit() {
    // let question=this.state.selectedOption1;
    console.log(this.state.selectedOption1)
    console.log(this.state.selectedOption2)
    if (this.state.selectedOption1 == 'yes' && this.state.selectedOption2 == 'no')
        console.log('okie')
  }  

  render(){

    const options1 = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ]
    
    const options2 = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'neither', label: 'I have not watched this' },
    ]

    return (
    <div>
        <Container>
            <Row>
                <Col>
                    <video width="400" controls>
                        <source src='get_movie' type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <br/>
                    Have you watched this movie before? 
                    <Select
                        onChange={this.handleChange1.bind(this)}
                        options={options1}
                    />
                    Do you remember the title of the movie?
                    <Select
                        onChange={this.handleChange2.bind(this)}
                        options={options2}
                    />
                    <Button variant="dark" onClick={this.handleSubmit.bind(this)}>Next</Button>

                    {/* <Questions /> */}
                    {/* <Movies /> */}
                </Col>
            </Row>
        </Container>
        
    </div>
    );
  }
}

export default Enduser;