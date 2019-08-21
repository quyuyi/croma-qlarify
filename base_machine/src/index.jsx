import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dataset from "./dataset.jsx";
import Rules from "./rules.jsx";
import Example from "./example.jsx";

class App extends React.Component {

    render(){
        return (
            <Router>
              <div>
                <ul>
                  <li>
                    <Link to="/condition1">condition1</Link>
                  </li>
                  <li>
                    <Link to="/condition3">condition3</Link>
                  </li>
                </ul>
        
                <hr />
        
                <Route path="/condition1" component={Example} />
                <Route path="/condition3" component={Rules} />

              </div>
            </Router>
          );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
