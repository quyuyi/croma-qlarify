import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'id',
        text: 'Rank',
    },
    {
        dataField: 'feature',
        text: 'Feature',
    },
]

const NoDataIndication = () => (
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
);

class Rules extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
          // Post data from server
          rules: [],
          selected:'',
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch('/render_features/', { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((data) => {
                console.log('printing from fetchData');
                console.log(data.rules);
                console.log(data.rules[0]);
                console.log(data.rules[0].split);
                this.setState({
                    rules: data.rules,
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
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

    handleOnSelect(row, isSelect){
        if (isSelect) {
          this.setState(() => ({
            selected: row.feature
          }));
        }
    }

    handleSubmit() {
        setTimeout(()=>{

            let selected_rule=this.state.selected
            console.log('printing from handleSubmit')
            console.log(selected_rule);
    
            this.postData('/fetch_condition3_rank/', {feature:selected_rule}) //feature_value
            .then(data => {
                this.setState({
                    rules: data.rules,
                    selected: '',
                });
                console.log('selected feature is ' + selected_rule)
                console.log(data.rules)
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));

        },0);

        this.setState(()=>({rules:[]}));
    }  


    render() {
        // const selectRow = {
        //     mode: 'radio',
        //     clickToSelect: true,
        //     onSelect: this.handleOnSelect,
        // };
        return (
            <div>
                <BootstrapTable
                className="table"
                keyField="id"
                data={ this.state.rules }
                columns={ columns }
                // selectRow = { selectRow }
                noDataIndication={ () => <NoDataIndication /> }
                striped
                hover
                condensed
                />
                {/* <button 
                type='button'
                className="btn btn-primary"
                onClick={()=>this.handleSubmit()}>Submit</button> */}
            </div>
        );
    }
}

export default Rules;
