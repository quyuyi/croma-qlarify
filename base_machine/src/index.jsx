import React from "react";
import ReactDOM from 'react-dom';
import Baseline from './baseline.jsx';
import Hybrid from './hybrid.jsx';
import Enduser from './enduser.jsx';

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
          <Baseline />
      )
    }

    if (condition == "hybrid") {
      return (
        <div>
          <Hybrid />
        </div>
      )   
    }

    if (condition == "end-user") {
      return (
        <div>
          <Enduser />
        </div>
      )   
    }
  }

  render(){

    const condition = 'end-user'
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
