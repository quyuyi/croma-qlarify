import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Button from 'react-bootstrap/Button';
import {DelayInput} from 'react-delay-input';

class TableNoFilter extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            data: [],
            loading: true,
        };

        this.fetchDataset = this.fetchDataset.bind(this);

    }


    componentDidMount() {
        this.fetchDataset();
    }

    fetchDataset() {
        fetch('/render_dataset/', { credentials: 'same-origin' })
            .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
            })
            .then((dat) => {
                // console.log(dat)
                this.setState({
                    data: dat.dataset,
                    loading: false
                });
                this.props.checkFinishLoading(false);
                console.log("table finish loading")
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


    render() {
        const { data, loading } = this.state;
        const width=200;
        const textStyle={ 
            'height': 80,
            'whiteSpace': 'unset',
        };

        const columns = [
            {
               Header: 'id',
               accessor: 'id',
            }, 
            {
               Header: 'imdb_id',
               accessor: 'imdb_id',
            }, 
            {
               Header: 'title',
               accessor: 'title',
               style: textStyle,
            }, 
            {
               Header: 'belongs_to_collection',
               accessor: 'belongs_to_collection',
               style: textStyle,
            }, 
            {
               Header: 'budget',
               accessor: 'budget',
            }, 
            {
               Header: 'genres',
               accessor: 'genres',
            }, 
            {
               Header: 'homepage',
               accessor: 'homepage',
            }, 
            {
               Header: 'original language',
               accessor: 'original_language',
            }, 
            {
               Header: 'original title',
               accessor: 'original_title',
               style: textStyle,
            }, 
            {
               Header: 'overview',
               accessor: 'overview',
               width: width,
               style: textStyle,
               Cell: row => (
                   <div className='verticalScroll'>{row.value}</div>
               ),            
            }, 
            {
               Header: 'popularity',
               accessor: 'popularity',
            }, 
            {
               Header: 'poster_path',
               accessor: 'poster_path',
            }, 
            {
               Header: 'production_companies',
               accessor: 'production_companies',
            },
            {
                Header: 'production_countries',
                accessor: 'production_countries',
            }, 
            {
                Header: 'release date',
                accessor: 'release_date',
            }, 
            {
                Header: 'revenue',
                accessor: 'revenue',
            }, 
            {
                Header: 'runtime',
                accessor: 'runtime',
                width: width,
            }, 
            {
                Header: 'spoken_languages',
                accessor: 'spoken_languages',
            }, 
            {
                Header: 'status',
                accessor: 'status',
            }, 
            {
                Header: 'tagline',
                accessor: 'tagline',
                width: width,
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
            }, 
            {
                Header: 'video',
                accessor: 'video',
            }, 
            {
                Header: 'vote average',
                accessor: 'vote_average',
            }, 
            {
                Header: 'vote_count',
                accessor: 'vote_count',
            }, 
            {
                Header: 'adult',
                accessor: 'adult',           
            }, 
            // {
            //     Header: 'characters',
            //     accessor: 'characters',
            //     width: width,
            //     style: textStyle,
            //     Cell: row => (
            //         <div className='verticalScroll'>{row.value}</div>
            //     ),
            //     filterMethod: (filter, rows) =>
            //     matchSorter(rows, filter.value, { keys: ["tagline"] }),
            //     Filter: ({filter,onChange}) => {
            //         return (
            //             <TextFilter
            //             accessor='tagline'
            //             value={filter ? filter.value : ''}
            //             onFilteredChangeCustom={this.onFilteredChangeCustom}
            //             />
            //         );
            //     },
            //     filterAll: true,
            // }, 
            // {
            //     Header: 'cast',
            //     accessor: 'cast',
            //     width: width,
            //     style: textStyle,
            //     Cell: row => (
            //         <div className='verticalScroll'>{row.value}</div>
            //     ),
            //     filterMethod: (filter, rows) =>
            //     matchSorter(rows, filter.value, { keys: ["director"] }),
            //     Filter: ({filter,onChange}) => {
            //         return (
            //             <TextFilter
            //             accessor='cast'
            //             value={filter ? filter.value : ''}
            //             onFilteredChangeCustom={this.onFilteredChangeCustom}
            //             />
            //         );
            //     },
            //     filterAll: true,
            // }, 
            // {
            //     Header: 'director',
            //     accessor: 'director',
            //     filterMethod: (filter, rows) =>
            //     matchSorter(rows, filter.value, { keys: ["director"] }),
            //     Filter: ({filter,onChange}) => {
            //         return (
            //             <TextFilter
            //             accessor='director'
            //             value={filter ? filter.value : ''}
            //             onFilteredChangeCustom={this.onFilteredChangeCustom}
            //             />
            //         );
            //     },
            //     filterAll: true,
            // }
        ]
       
        return( <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        loading={loading}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        ref={(r) => {this.reactTable = r;}}
                    />
                </div> 
        );
    }

}

export default TableNoFilter;