import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Questions from './questions.jsx';
import Submit from "./submit.jsx";

const totalMovies=8;


class Enduser extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedOption1: 'null',
			selectedOption2: null,
			onWatch: true,
			onRemember: false,
			metadata: false,
			movieIndex: 1,
			start: false,
			results: [],
		};
	}

	handleChange1(e) {
		this.setState({ selectedOption1 : e.value });
	};
	handleChange2(e) {
		this.setState({ selectedOption2 : e.value });
	};

	handleSubmit() {
		const record={
			movieIndex: this.state.movieIndex,
			watched: this.state.selectedOption1,
			remenered: this.state.selectedOption2,
		};
		const previous=this.state.results;
		this.setState({
			results: [...previous,record],
		});

		if (this.state.movieIndex == totalMovies && 
			(this.state.selectedOption1=='no' || this.state.selectedOption2=='yes')) {
			this.setState({ 
				onWatch: false,
				onRemember: false,
				selectedOption1: 'null',
				selectedOption2: null,
				movieIndex: this.state.movieIndex + 1
			});
		}
		else if (this.state.selectedOption1 == 'yes') {
			this.setState({ 
				onWatch: false,
				onRemember: true,
				selectedOption1: 'null'
			});
		}
		else if (this.state.selectedOption1 == 'no') {
			this.setState({ 
				selectedOption1: 'null',
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


	onStart() {
		this.setState({start: true});
	}

	renderInstruction() {
		return (
			<div>
			<div className='questions-header'>
				<h2>
				In this HIT, you will be given up to {totalMovies} movie clips(some of them are R rated), and you will be asked to answer two questions to see if you are qualified to do the second part of the task, which will take approximately 5 more minutes.
				<br></br>
				You will be paid a bonus of $1 if you are matched with the requirement and do the second part of the task.
				<br></br>
				Your answers will be collected to simulate a hypothetical end user searching for a movie in a research study.
				</h2>
			</div>
			
			<Button variant="dark" onClick={this.onStart.bind(this)} block>Start</Button>
			</div>
		);

	}


	renderQuestion1() {
		const options = [
			{ value: 'null', label: 'Please select...'},
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		]

		if (this.state.onWatch)
			return (
				<div>
					Have you watched this movie before? 
					<Select
						name='select1'
						onChange={this.handleChange1.bind(this)}
						options={options}
						value={options.find(option => option.value === this.state.selectedOption1)}
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
				<Questions 
				// workerId={this.props.workerId}
				movieIndex={this.state.movieIndex}
				// submitHIT={this.props.submitHIT}
				/>
			)
	}

	// onSubmitHIT() {
	// 	// const workerId=gup("workerId");
	// 	// console.log("workerId");
	// 	const result={
	// 	  'workerId': this.props.workerId,
	// 	  'movieIndex': -1,
	// 	  'answers': "No movie can be applied.",
	// 	};
		
	// 	this.props.submitHIT(result);
	// }

	// submitHIT(result) {
	// 	// TODO:
	// 	// send result back to server
	// 	// or to a database?

	// 	console.log('submit from outside');
	// 	console.log(result);
	// 	$(document).ready(function(){
	// 	  $("form#mturk_form").submit();
	// 	});
	// 	console.log('submitting hit....')
	// }


	renderMovie() {

		const movieIndex = this.state.movieIndex
		const src='/get_movie'+movieIndex.toString();
		// const shouldShow1 = movieIndex===1
		// const shouldShow2 = movieIndex===2
		// const shouldShow3 = movieIndex===3
		// const shouldShow4 = movieIndex===4
		// const shouldShow5 = movieIndex===5
		// const shouldShow6 = movieIndex===6
		
		if (!this.state.metadata) {
			return (
				<div>
					<br/>
					{/* <video width="400" controls className={shouldShow1 ? '':'hidden'}>
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
					</video> */}
					{/* <video 
					width="400" 
					src={src}
					controls
					 >
					Your browser does not support HTML5 video.
					</video> */}
					{/* <Button 
					variant="dark" 
					onClick={this.onSubmitHIT.bind(this)} 
					bsPrefix={shouldShow6 ? '':'hidden'}>
					Submit HIT
					</Button> */}
					{(movieIndex===totalMovies+1) ? this.renderEnd() : this.renderVideo(src)}
					<br/>
				</div>
			)
		}

	}

	renderEnd(){
		return (
			<Submit
			movieIndex={-1}
			result={this.state.results}
			condition='end_user'
			/>
		);
	}

	renderVideo(src){
		return (
			<div>
				<video 
				width="400" 
				src={src}
				controls
				>
				Your browser does not support HTML5 video.
				</video>
			</div>
		);
	}

	renderQuestion() {
		return (
			<div>
				{this.renderMovie()}
				{this.renderQuestion1()}
				{this.renderQuestion2()}
				{this.renderMetadataQuestions()}
			</div>
		);
	}

	render() {
		const start=this.state.start;
		return (
		<div>
			<Container>
				<Row>
					<Col>
						{(start) ? this.renderQuestion() : this.renderInstruction()}
					</Col>
				</Row>
			</Container>
			
		</div>
		);
	}
}

export default Enduser;