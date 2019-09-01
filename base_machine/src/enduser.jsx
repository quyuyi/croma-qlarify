import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Questions from './questions.jsx';

class Enduser extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedOption1: null,
			selectedOption2: null,
			onWatch: true,
			onRemember: false,
			metadata: false,
			movieIndex: 1
		};
	}

	handleChange1(e) {
		this.setState({ selectedOption1 : e.value });
	};
	handleChange2(e) {
		this.setState({ selectedOption2 : e.value });
	};

	handleSubmit() {
		if (this.state.movieIndex == 5) {
			this.setState({ 
				onWatch: false,
				onRemember: false,
				selectedOption1: null,
				selectedOption2: null,
				movieIndex: this.state.movieIndex + 1
			});
		}
		else if (this.state.selectedOption1 == 'yes') {
			this.setState({ 
				onWatch: false,
				onRemember: true,
				selectedOption1: null
			});
		}
		else if (this.state.selectedOption1 == 'no') {
			this.setState({ 
				selectedOption1: null,
				movieIndex: this.state.movieIndex + 1
			});
		}
		else if (this.state.selectedOption2 == 'yes') {
			this.setState({
				onWatch: true,
				onRemember: false,
				metadata: false,
				selectedOption2: null,
				movieIndex: this.state.movieIndex + 1
			});
		}
		else if (this.state.selectedOption2 == 'no') {
			this.setState({
				onWatch: false,
				onRemember: false,
				metadata: true,
				selectedOption2: null
			});
		}
		else {
			console.log('Please enter a response')	
		}	
	}

	renderQuestion1() {

		const options = [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		]

		if (this.state.onWatch)
			return (
				<div>
					Have you watched this movie before? 
					<Select
						onChange={this.handleChange1.bind(this)}
						options={options}
					/>
					<Button variant="dark" onClick={this.handleSubmit.bind(this)}>Next</Button>
				</div>
			)
    }

	renderQuestion2() {

		const options = [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		]

		if (this.state.onRemember)
			return (
				<div>
					Do you remember the title of the movie?
					<Select
						onChange={this.handleChange2.bind(this)}
						options={options}
					/>
					<Button variant="dark" onClick={this.handleSubmit.bind(this)}>Next</Button>
				</div>
			)
	}

	renderMetadataQuestions() {
		if (this.state.metadata)
			return (
				<Questions />
			)
	}

	submitHIT() {
		console.log('submitting hit....')
	}

	renderMovie() {

		const movieIndex = this.state.movieIndex
		const shouldShow1 = movieIndex===1
		const shouldShow2 = movieIndex===2
		const shouldShow3 = movieIndex===3
		const shouldShow4 = movieIndex===4
		const shouldShow5 = movieIndex===5
		const shouldShow6 = movieIndex===6

		console.log(shouldShow6)
		if (!this.state.metadata) {
			return (
				<div>
					<br/>
					<video width="400" controls className={shouldShow1 ? '':'hidden'}>
						<source src={'get_movie1'} type="video/mp4" />
						Your browser does not support HTML5 video.
					</video>
					<video width="400" controls className={shouldShow2 ? '':'hidden'}>
						<source src={'/get_movie2'} type="video/mp4" />
						Your browser does not support HTML5 video.
					</video>
					<video width="400" controls className={shouldShow3 ? '':'hidden'}>
						<source src={'/get_movie3'} type="video/mp4" />
						Your browser does not support HTML5 video.
					</video>
					<video width="400" controls className={shouldShow4 ? '':'hidden'}>
						<source src={'/get_movie4'} type="video/mp4" />
						Your browser does not support HTML5 video.
					</video>
					<video width="400" controls className={shouldShow5 ? '':'hidden'}>
						<source src={'/get_movie5'} type="video/mp4" />
						Your browser does not support HTML5 video.
					</video>
					<Button 
					variant="dark" 
					onClick={this.submitHIT.bind(this)} 
					bsPrefix={shouldShow6 ? '':'hidden'}>
					Submit HIT
					</Button>
					<br/>
				</div>
			)
		}

	}

	render() {

		return (
		<div>
			<Container>
				<Row>
					<Col>
						{this.renderMovie()}
						{this.renderQuestion1()}
						{this.renderQuestion2()}
						{this.renderMetadataQuestions()}
					</Col>
				</Row>
			</Container>
			
		</div>
		);
	}
}

export default Enduser;