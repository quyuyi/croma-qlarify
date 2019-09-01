import React from 'react';
import ReactTable from 'react-table';

class Rules extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
        };
    }

    render() {
        const data=this.props.rules;
        const loading=this.props.loading;
        
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



