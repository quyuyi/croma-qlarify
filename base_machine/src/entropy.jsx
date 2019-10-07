import React from 'react';
import ReactTable from 'react-table';
import NumberFormat from 'react-number-format';

class Entropy extends React.Component {

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
                accessor: 'rank',
            },
            {
                Header: 'Question',
                accessor: 'feature',
            },
            {
                Header: 'Score',
                accessor: 'entropy',
                Cell: row => (
                    <NumberFormat value={row.value} displayType={'text'} decimalScale={2} />
                ),
            }
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

export default Entropy;



