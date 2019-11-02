import React from "react";
import ReactDOM from 'react-dom';
import Baseline from './baseline.jsx';
import Hybrid from './hybrid.jsx';
import Enduser from './enduser.jsx';
import Condition3 from "./condition3.jsx";
import Condition4 from "./condition4.jsx";
import Enduser2 from "./enduser2.jsx";

// function gup(name) {
// 	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
// 	var regexS = "[\\?&]"+name+"=([^&#]*)";
// 	var regex = new RegExp(regexS);
// 	var results = regex.exec(window.location.href);
// 	if(results == null)
// 	  return "";
// 	else return unescape(results[1]);
// }

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
    };

    this.handleConditions = this.handleConditions.bind(this);
    this.checkFinishLoading = this.checkFinishLoading.bind(this);

  }


  // set the start time for the first question
  // when the table is fully loaded
  checkFinishLoading(loading){
    if (!loading){
        this.setState({
            startTime: new Date().getTime(),
        });
    }
  }


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
  

  handleConditions(condition) {
		// const workerId=gup("workerId");
		// console.log("workerId is ", workerId);

    if (condition == "human") {
      return (
          <Baseline
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          checkFinishLoading={this.checkFinishLoading}
          startTime={this.state.startTime}
          />
      )
    }

    if (condition == "hybrid") {
      console.log("this is condition: hybrid");
      return (
        <div>
          <Hybrid
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          checkFinishLoading={this.checkFinishLoading}
          startTime={this.state.startTime}
          />
        </div>
      )   
    }

    if (condition == "end-user") {
      console.log("condition is end-user");
      return (
        <div>
          <Enduser
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          />
        </div>
      )
    }
    if (condition == "condition3") {
      return (
        <div>
          <Condition3 
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          checkFinishLoading={this.checkFinishLoading}
          startTime={this.state.startTime}
          />
        </div>
      )   
    }

    if (condition == "condition4") {
      return (
        <div>
          <Condition4 
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          checkFinishLoading={this.checkFinishLoading}
          startTime={this.state.startTime}
          />
        </div>
      )
    }

    if (condition == "end-user2") {
      return (
        <div>
          <Enduser2 
          // workerId= {workerId}
          // submitHIT= {this.submitHIT}
          checkFinishLoading={this.checkFinishLoading}
          startTime={this.state.startTime}
          />
        </div>
      )
    }
  }

  render(){

    const condition = 'end-user2';
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
