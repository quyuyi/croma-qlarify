import React from "react";
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Baseline from './baseline.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleConditions = this.handleConditions.bind(this);
  }

  handleConditions(condition) {
    if (condition == "human") {
      return (
        <div>
          <Baseline/>
        </div>
      )
    }

    if (condition == "hybrid") {
      return (
        <div>
          okie
        </div>
      )   
    }
  }

  render(){

    const condition = 'human'
      return (
        <div>
          {this.handleConditions(condition)}
        </div>

          // <Router>
          //   <div>
          //     <ul>
          //       <li>
          //         <Link to="/condition1">condition1</Link>
          //       </li>
          //       <li>
          //         <Link to="/condition3_rank">condition3 - rank</Link>
          //       </li>
          //       <li>
          //         <Link to='/condition3_entropy'>condition3 - entropy</Link>
          //       </li>
          //       <li>
          //         <Link to='/condition3_split'>condition3 - split</Link>
          //       </li>
          //     </ul>

          //     <hr />

          //     <Route path="/condition1" component={Example} />
          //     <Route path="/condition3_rank" component={Rules} />
          //     <Route path="/condition3_entropy" component={Entropy} />
          //     <Route path="/condition3_split" component={Split} />

          //   </div>
          // </Router>
        );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
