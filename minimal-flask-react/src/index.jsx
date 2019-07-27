import React from 'react';
import ReactDOM from 'react-dom';
import Rule from './rule.jsx';

class App extends React.Component {

    constructor() {
        // Initialize mutable state
        super();
        this.state = {
          // Post data from server
          rules: [],
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch('/rules/', { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    rules: data.rules,
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    renderRules() {

        return(
            <div>
                {this.state.rules.map((rule, idx) => {
                    return <Rule key={idx} words={rule.words} docs={rule.documents} />
                })}
            </div>
        )
    }


    render() {
        console.log(this.state.rules)

        let rules_section = null
        if (this.state.rules) 
            rules_section = this.renderRules()

        return (
            <div>
                {rules_section}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
