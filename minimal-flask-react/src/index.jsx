import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {

    constructor() {
        // Initialize mutable state
        super();
        this.state = {
          // Post data from server
          keywords: '',
          url: '',
        };
        this.url = '/api/';
        this.fetchData = this.fetchData.bind(this);
      }

    componentWillMount() {
        this.fetchData();
      }
    
    fetchData() {
        fetch(this.url, { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((data) => {
            this.setState({
                keywords: data.keywords,
            });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    render() {
        return (
            <div>
                <div>Hello World</div>
                <div>{this.state.keywords}</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
