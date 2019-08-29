import React from 'react';
import ReactTable from 'react-table';

class Rules extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
          // Post data from server
          data: [],
          loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
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
                this.setState({
                    data: data.rules,
                    loading: false,
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    render() {
        const {data,loading}=this.state;
        const columns=[
            {
                Header: 'Rank',
                accessor: 'id',
            },
            {
                Header: 'Feature',
                accessor: 'feature',
            },
        ];

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />   
            </div>
        );
    }

}

export default Rules;



