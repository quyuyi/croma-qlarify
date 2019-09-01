import React from "react";
import ReactDOM from 'react-dom';
import Baseline from './baseline.jsx';
import Hybrid from './hybrid.jsx';
import Enduser from './enduser.jsx';
import Condition3 from "./condition3.jsx";
import Condition4 from "./condition4.jsx";

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
    if (condition == "condition3") {
      return (
        <div>
          <Condition3 />
        </div>
      )   
    }

    if (condition == "condition4") {
      return (
        <div>
          <Condition4 />
        </div>
      )
    }
  }

  render(){

    const condition = 'condition3'
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
