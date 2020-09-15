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
                Header: () => <div><input type="radio" name="feature" value='id'/><p></p><p>id</p></div>,
            //    Header: 'id',
               accessor: 'id',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='imdb_id'/><p></p><p>imdb_id</p></div>,
               accessor: 'imdb_id',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='title'/><p></p><p>title</p></div>,
               accessor: 'title',
               style: textStyle,
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='belongs_to_collection'/><p></p><p>belongs_to_collection</p></div>,
               accessor: 'belongs_to_collection',
               style: textStyle,
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='budget'/><p></p><p>budget</p></div>,
               accessor: 'budget',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='genres'/><p></p><p>genres</p></div>,
               accessor: 'genres',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='homepage'/><p></p><p>homepage</p></div>,
               accessor: 'homepage',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='original_language'/><p></p><p>original_language</p></div>,
               accessor: 'original_language',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='original_title'/><p></p><p>original_title</p></div>,
               accessor: 'original_title',
               style: textStyle,
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='overview'/><p></p><p>overview</p></div>,
               accessor: 'overview',
               width: width,
               style: textStyle,
               Cell: row => (
                   <div className='verticalScroll'>{row.value}</div>
               ),            
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='popularity'/><p></p><p>popularity</p></div>,
               accessor: 'popularity',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='poster_path'/><p></p><p>poster_path</p></div>,
               accessor: 'poster_path',
            }, 
            {
               Header: () => <div><input type="radio" name="feature" value='production_companies'/><p></p><p>production_companies</p></div>,
               accessor: 'production_companies',
            },
            {
                Header: () => <div><input type="radio" name="feature" value='production_countries'/><p></p><p>production_countries</p></div>,
                accessor: 'production_countries',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='release_date'/><p></p><p>release_date</p></div>,
                accessor: 'release_date',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='revenue'/><p></p><p>revenue</p></div>,
                accessor: 'revenue',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='runtime'/><p></p><p>runtime</p></div>,
                accessor: 'runtime',
                width: width,
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='spoken_languages'/><p></p><p>spoken_languages</p></div>,
                accessor: 'spoken_languages',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='status'/><p></p><p>status</p></div>,
                accessor: 'status',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='tagline'/><p></p><p>tagline</p></div>,
                accessor: 'tagline',
                width: width,
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='video'/><p></p><p>video</p></div>,
                accessor: 'video',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='vote_average'/><p></p><p>vote_average</p></div>,
                accessor: 'vote_average',
            }, 
            {
                Header:() => <div><input type="radio" name="feature" value='vote_count'/><p></p><p>vote_count</p></div>,
                accessor: 'vote_count',
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='adult'/><p></p><p>adult</p></div>,
                accessor: 'adult',           
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='characters'/><p></p><p>characters</p></div>,
                accessor: 'characters',
                width: width,
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='cast'/><p></p><p>cast</p></div>,
                accessor: 'cast',
                width: width,
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
            }, 
            {
                Header: () => <div><input type="radio" name="feature" value='director'/><p></p><p>director</p></div>,
                accessor: 'director',
                style: textStyle,
            },
            {
                Header: () => <div><input type="radio" name="feature" value='screenplay'/><p></p><p>screenplay</p></div>,
                accessor: 'screenplay',
                style: textStyle,
            },
            {
                Header: () => <div><input type="radio" name="feature" value='keywords'/><p></p><p>keywords</p></div>,
                accessor: 'keywords',
                width: width,
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
            }
        ]
       
        return( <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        loading={loading}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        ref={(r) => {this.reactTable = r;}}
                    />
                </div> 
        );
    }

}

export default TableNoFilter;