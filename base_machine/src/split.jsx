import React from 'react';
import ReactTable from 'react-table';

// const columns2 = [
//     {
//         dataField: 'value',
//         text: 'value',
//     },
//     {
//         dataField: 'counts',
//         text: 'counts',
//     },
// ]

class Split extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
          // Post data from server
          data: [],
          loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
        // this.distributionTable = this.distributionTable.bind(this);
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
                // let adult=document.getElementById('adult');
                // adult.innerHTML=this.distributionTable('adult');
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    // distributionTable(feature){
    //     return (
    //         <div>
    //             <BootstrapTable
    //             keyField="value"
    //             data={ this.state.rules[0].split }
    //             columns={ columns2 }
    //             noDataIndication={ () => <NoDataIndication /> }
    //             striped
    //             hover
    //             condensed
    //             />
    //         </div>
    //     )
    // }


    render() {
        const {data,loading}=this.state;
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