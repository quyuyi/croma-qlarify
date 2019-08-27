import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import select from 'react-bootstrap-table2-filter/lib/src/components/select';


class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            histories:[
                {
                    'question':'question',
                    'answer':'answer',
                },
            ],
            selectedOption: null,
        };

        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {

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
    
    handleSubmit() {
        let question=this.state.selectedOption;
        // how to filter open-ended questions?
        this.postData('/fetch_condition1/', {question:question}) 
        .then(data => {
            console.log(data)
            // TODO
            // add (feature,value) pair to history
            this.setState({
                histories:[...this.state.histories,
                    {'question':question,'answer':data.answer}],
            });
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
        // document.getElementById('question').value='';
    }        

    handleChange(e) {
        console.log(e)
        this.setState({ selectedOption : e.value });
      };
    

    render(){

        const options = [
            { value: 'id', label: 'id' },
            { value: 'imdb_id', label: 'imdb id' },
            { value: 'title', label: 'title' },
            { value: 'belongs_to_collection', label: 'belongs to collection' },
            { value: 'budget', label: 'budget' },
            { value: 'genres', label: 'genres' },
            { value: 'homepage', label: 'homepage' },
            { value: 'original_language', label: 'original language' },
            { value: 'original_title', label: 'original title' },
            { value: 'overview', label: 'overview' },
            { value: 'popularity', label: 'popularity' },
            { value: 'poster_path', label: 'poster path' },
            { value: 'production_companies', label: 'production companies' },
            { value: 'production_countries', label: 'production countries' },
            { value: 'release_date', label: 'release date' },
            { value: 'revenue', label: 'revenue' },
            { value: 'runtime', label: 'runtime' },
            { value: 'spoken_languages', label: 'spoken languages' },
            { value: 'status', label: 'status' },
            { value: 'tagline', label: 'tagline' },
            { value: 'video', label: 'video' },
            { value: 'vote_average', label: 'vote average' },
            { value: 'vote_count', label: 'vote count' },
            { value: 'adult', label: 'adult' },
          ]

        return (
            <div className='history'>
                <header>
                    <p className='head'>Interaction History</p>

                    {/* <input 
                    id='question'
                    className='input'
                    type='text' 
                    ref='textInput'
                    placeholder='Type your question here.'></input> */}

                    <Select
                        onChange={this.handleChange.bind(this)}
                        options={options}
                    />
                    <button 
                    type='button'
                    className="btn btn-primary"
                    onClick={this.handleSubmit.bind(this)}>Ask</button>
                </header>


                {this.state.histories.map((h,idx) => {
                    return (
                        <ul key={idx}>
                            {h.question}:{h.answer}
                        </ul>
                    )
                })}

            </div>
        );
    }
}

export default History;