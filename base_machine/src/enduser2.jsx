import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Questions from './questions.jsx';
import Submit from './submit.jsx';
// comment
class Enduser2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        movies: [
        'X-Men: The Last Stand', 'The Wolverine', 'Kung Fu Panda 2', 
        'District 9', 'Shrek Forever After', "Ender's Game", 'RoboCop', 'Captain Phillips',
        'Godzilla', 'Shrek the Third', 'Ex Machina', 'Oblivion', 'Elysium', 'Memento', 'WALL·E', 
        'Madagascar', 'Shrek 2', 'Monsters University', 'Ice Age: The Meltdown', "A Bug's Life"
        ],
        showItems:5,
        showLinks:1,
        checks: new Array(20).fill(false),
        trueArr: [],
        renderPage2: false,
        renderPage3: false,
        renderPage0: true,
        renderPage1: false,
        renderEnd1: false,
        links: [
            'https://www.themoviedb.org/movie/36668-x-men-the-last-stand?language=en-US',
            'https://www.themoviedb.org/movie/76170-the-wolverine?language=en-US',
            'https://www.themoviedb.org/movie/49444-kung-fu-panda-2?language=en-US',
            'https://www.themoviedb.org/movie/17654-district-9?language=en-US',
            'https://www.themoviedb.org/movie/10192-shrek-forever-after?language=en-US',
            'https://www.themoviedb.org/movie/80274-ender-s-game?language=en-US',
            'https://www.themoviedb.org/movie/97020-robocop?language=en-US',
            'https://www.themoviedb.org/movie/109424-captain-phillips?language=en-US',
            'https://www.themoviedb.org/movie/124905-godzilla?language=en-US',
            'https://www.themoviedb.org/movie/810-shrek-the-third?language=en-US',
            'https://www.themoviedb.org/movie/264660-ex-machina?language=en-US',
            'https://www.themoviedb.org/movie/75612-oblivion?language=en-US',
            'https://www.themoviedb.org/movie/68724-elysium?language=en-US',
            'https://www.themoviedb.org/movie/77-memento?language=en-US',
            'https://www.themoviedb.org/movie/10681-wall-e?language=en-US',
            'https://www.themoviedb.org/movie/953-madagascar?language=en-US',
            'https://www.themoviedb.org/movie/809-shrek-2?language=en-US',
            'https://www.themoviedb.org/movie/62211-monsters-university?language=en-US',
            'https://www.themoviedb.org/movie/950-ice-age-the-meltdown?language=en-US',
            'https://www.themoviedb.org/movie/9487-a-bug-s-life?language=en-US'
        ],
        chosenMovie: -1, //movie that chosen to be answered questions about
        numShowed: 0
    };
  }

  checked(idx) {
    let temp = this.state.checks;
    temp[idx] = !temp[idx]
    this.setState({
        checks: temp,
    });
  }

  handleShowMore() {
      if (this.state.showItems >= this.state.movies.length-5){
          document.getElementById("show_more").style.display='none';
      }
      this.setState({
        showItems: this.state.showItems >= this.state.movies.length ?
            this.state.showItems : this.state.showItems+5,
        numShowed: this.state.numShowed+1
      })
  }

  handleNext() {
      console.log(this.state.checks)
      let trueArr = []
      this.state.checks.forEach((s,idx) => {
          if (s == true) {
              trueArr.push(idx)
          }
      })
      console.log(trueArr)
      if (trueArr.length>5) {
          alert('You selected more than 5 movies, please only select 5.')
      } 
      else if (trueArr.length<5) {
          if (this.state.numShowed < 3) {
              alert('please go through all movies')
          } 
          else {
              console.log('submitting the hit');
              this.setState({
                  renderPage1: false,
                  renderEnd1: true,
              })
          }
      } 
      else {
        console.log('render the links to the 5 movies')
        this.setState({
            renderPage1: false,
            renderPage2: true,
            trueArr: trueArr,
        })
      }
  }

  handleStart() {
      this.setState({
          renderPage0: false,
          renderPage1: true,
      });
  }

  handleBrowseNext() {
      this.setState({
          showLinks: this.state.showLinks >= 5 ? this.state.showLinks : this.state.showLinks+1,
      })
  }

  renderPage0Instruction(){
      return (
        <div>
        <div className='questions-header'>
            <h2>
            In this HIT, you will be asked to first select 5 movies that you have not seen before. Then you will be directed to a page on The Movie Database for each movie. After viewing some information about these movies, you will be asked to answer some questions. A bonus of $0.5 will be awarded based on the quality of your performance. 
            <br></br>
            Your answers will be collected as part of a research study to simulate a hypothetical end user searching for a movie to watch. 
            </h2>
        </div>
        <Button variant="dark" onClick={this.handleStart.bind(this)} block>Start</Button>
        </div>
      );
  }

  renderPage1Instruction(){
    return (
        <div>
        <div className='questions-header'>
            <h2>
            Please select 5 movies you have never watched before. Click show more if the movies shown are not enough for you to select 5. 
            <br></br>
            Click next if you have selected 5 movies. 
            <br></br>
            If you have gone through the entire list, and still don't have a list of 5 movies, you can also click next to proceed. 
            </h2>
        </div>
        </div>
      );
  }

  renderPage2Instruction(){
    return (
        <div>
        <div className='questions-header'>
            <h2>
            Please click on the link to find out more about the movie. Pretend you are looking for a movie to watch and need to decide whether or not you will watch this movie later. 
            </h2>
        </div>
        </div>
      );
  }

  renderMovieCheckboxes() {
    return (
        this.state.movies.slice(0,this.state.showItems).map((m,idx) => {
            return (
                <InputGroup className="mb-3" key={idx}>
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox" onClick={this.checked.bind(this, idx)}/>
                    <InputGroup.Text id="inputGroup-sizing-sm">{m}</InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
            )
        })
    )
  }

    renderMovieLinks() {
        return (
            this.state.trueArr.slice(0,this.state.showLinks).map((elem,idx) => {
                return (
                    <div key={idx}>
                        {/* <iframe
                        src={this.state.links[elem]}>
                            <p>Your browser does not support iframes.</p>
                        </iframe> */}
                        <a 
                        href={this.state.links[elem]} 
                        target="_blank">
                            {this.state.movies[elem]}
                        </a>
                    </div>
                )
            })
        );
    }

    handleNext2() {
        console.log('next 2 ')
        const length=this.state.trueArr.length;
        const trueArr=this.state.trueArr;
        let chosenMovieIndex=trueArr.slice(0,length-1)[Math.floor(Math.random() * (length-1))];
        let chosenMovie=this.state.movies[chosenMovieIndex];
        this.setState({
            chosenMovie: chosenMovie,
            renderPage3: true,
            renderPage2: false,
        });
        console.log("chosen movie is ",chosenMovie);
    }

    renderPage1() {
        return(
            <div>
                {this.renderPage1Instruction()}
                <br></br>
                {this.renderMovieCheckboxes()}
                <Button variant="dark" id="show_more" onClick={this.handleShowMore.bind(this)}>Show More</Button>
                <Button variant="dark" onClick={this.handleNext.bind(this)}>Next</Button>
            </div>
        )
    }

    renderPage2() {
        if(this.state.renderPage2) {
            return(
                <div>
                    {this.renderPage2Instruction()}
                    {this.renderMovieLinks()}
                    {this.state.showLinks==5 ? 
                    <Button variant="dark" onClick={this.handleNext2.bind(this)}>Next</Button> :
                    <Button variant="dark" onClick={this.handleBrowseNext.bind(this)}>Browse Next Movie</Button>
                    }
                </div>
            )
        }
    }

    renderEnd1() {
        return (
            <div>
                <div className='questions-header'>
                    <h2>
                        You have gone through all the movies and have a list of unwatched movies less than 5. Click Submit HIT to submit HIT.
                    </h2>
                </div>
              <Submit
              movieIndex={-1}
              result='cannot find a list of 5 unwatched movies after going through all the movies'
              condition='end_user'
              />
            </div>
        );
    }

  render(){
      if (this.state.renderPage0){
          return (
              <div>
                  <Container>
                  <Row>
                  {this.renderPage0Instruction()}
                  </Row>
                  </Container>
              </div>
          );
      }

      if (this.state.renderPage1) {
        return (
            <div>
                <Container>
                    <Row>
                        {this.renderPage1()}
                    </Row>
                </Container>
            </div>
          );
      }

      if (this.state.renderPage2){
        return (
          <div>
          <Container>
              <Row>
                  {this.renderPage2()}
              </Row>
          </Container>
      </div>
        )
    }

      if (this.state.renderPage3){
        return(
            <Container>
            <Row>
            <div>
              <Questions 
                  movieIndex={this.state.chosenMovie}
              />
            </div>
            </Row>
            </Container>
        );
    }

      if (this.state.renderEnd1) {
          return(
            <Container>
            <Row>
            <div>
                {this.renderEnd1()}
            </div>
            </Row>
            </Container>
          );
      }

      else {
          return (
              <div>

              </div>
          );
      }
  }
}

export default Enduser2;