import React from 'react';
import ReactTable from 'react-table';


class Split extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const data=this.props.rules;
        const loading=this.props.loading;

        const columns = [
            {
                Header: 'Info',
                columns: [
                    // {
                    //     accessor: 'id',
                    //     Header: 'Rank',
                    // },
                    {
                        accessor: 'feature',
                        Header: 'Feature',
                    },
                ],
            },
            {
                Header: 'Split distribution',
                columns: [
                    {
                        Header: 'Value',
                        accessor: 'value',
                    },
                    {
                        Header: 'Counts',
                        accessor: 'counts',
                    }
                ]
            }
        ];

        return (
            <ReactTable
                data={data}
                columns={columns}
                pivotBy={['feature']}
                loading={loading}
                defaultPageSize={10}
                className="-striped -highlight"
            />  
        );
    }

}

export default Split;