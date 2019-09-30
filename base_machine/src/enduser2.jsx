import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Questions from './questions.jsx';

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
        checks: new Array(20).fill(false),
        trueArr: [],
        renderMovieLinks: false,
        renderQuestions: false,
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
        movieChosen: -1, //movie that chosen to be answered questions about
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
      } else if (trueArr.length<5) {
          if (this.state.numShowed < 3) {
              alert('please go through all movies')
          } else {
              alert('submitting the hit')
          }
      } else {
        console.log('render the links to the 5 movies')
        this.setState({
            renderMovieLinks: true,
            trueArr: trueArr,
        })
      }
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
        
        let trueArr = []
        this.state.checks.forEach((s,idx) => {
            if (s == true) {
                trueArr.push(idx)
            }
        })

        return (
            trueArr.map((elem,idx) => {
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
        )
    }

    handleNext2() {
        console.log('next 2 ')
        const length=this.state.trueArr.length;
        const trueArr=this.state.trueArr;
        let chosenMovieIndex=trueArr.slice(0,length-1)[Math.floor(Math.random() * (length-1))];
        let chosenMovie=this.state.movies[chosenMovieIndex];
        this.setState({
            chosenMovie: chosenMovie,
            renderQuestions: true,
        });
        console.log("chosen movie is ",chosenMovie);
    }

    renderPage1() {
        return(
            <div>
                {this.renderMovieCheckboxes()}
                <Button variant="dark" onClick={this.handleShowMore.bind(this)}>Show More</Button>
                <Button variant="dark" onClick={this.handleNext.bind(this)}>Next</Button>
            </div>
        )
    }

    renderPage2() {
        if(this.state.renderMovieLinks) {
            return(
                <div>
                    {this.renderMovieLinks()}
                    <Button variant="dark" onClick={this.handleNext2.bind(this)}>Next</Button>
                </div>
            )
        }
    }

  render(){
      if (this.state.renderQuestions){
          return(
              <div>
                <Questions 
                    movieIndex={this.state.chosenMovie}
                />
              </div>
          );
      }
      if (this.state.renderMovieLinks){
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
      else {
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
  }
}

export default Enduser2;