import React from 'react';

class Rule extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            word_states : [],
            docs: []
        };
      }

      componentDidMount() {
          this.setState({
              word_states: new Array(this.props.words.length).fill(false),
              docs: this.props.docs
          })
      }

      postData(url = '', data = {}) {
        // Default options are marked with *
          return fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
          .then(response => response.json()); // parses JSON response into native JavaScript objects 
      }

      searchDocs() {
          let selected_words = [];
          this.state.word_states.forEach((word_state, idx) => {
              if (word_state)
                selected_words.push(this.props.words[idx])
          });
          console.log('search docs by keywords selected')
          console.log(selected_words)

          console.log(this.props.docs)
          this.postData('/docs/', {words: selected_words, corpus: this.props.docs})
            .then(data => {
                
                console.log(data.docs)
                this.setState({
                    docs: data.docs
                })

            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
      }

      selectWord(idx) {
        let temp_word_states = this.state.word_states;
        temp_word_states[idx] = !temp_word_states[idx]
        this.setState({
            word_states: temp_word_states
        })
      }

      render() {
        return (
          <div>
                keywords:
                {this.props.words.map((word, idx) => {
                    return <button 
                        onClick={this.selectWord.bind(this, idx)} 
                        style={{background: this.state.word_states[idx] ? "green": ""}} 
                        key={idx}>
                        {word}
                    </button>
                })}
                <button onClick={this.searchDocs.bind(this)}>Search</button>
                <div>docs:</div>
                <ul>
                    {this.state.docs.map((doc, idx) => {
                        return <li key={idx}>{doc}</li>
                    })}
                </ul>
          </div>
        );
    }

}

export default Rule;