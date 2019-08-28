import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './slider-components.jsx'



class DataTable extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            data: [],
            loading: true
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
                console.log(dat)
                this.setState({
                    data: dat.dataset,
                    loading: false
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }      

    render() {

        const { data, loading } = this.state;
        const columns = [
            {
               Header: 'id',
               accessor: 'id'
            }, {
               Header: 'imdb_id',
               accessor: 'imdb_id'
            }, {
               Header: 'title',
               accessor: 'title'
            }, {
               Header: 'belongs_to_collection',
               accessor: 'belongs_to_collection'
            }, {
               Header: 'budget',
               accessor: 'budget'
            }, {
               Header: 'genres',
               accessor: 'genres'
            }, {
               Header: 'homepage',
               accessor: 'homepage'
            }, {
               Header: 'original_language',
               accessor: 'original_language'
            }, {
               Header: 'original_title',
               accessor: 'original_title'
            }, {
               Header: 'overview',
               accessor: 'overview'
            }, {
               Header: 'popularity',
               accessor: 'popularity'
            }, {
               Header: 'poster_path',
               accessor: 'poster_path'
            }, {
               Header: 'production_companies',
               accessor: 'production_companies'
            }, {
                Header: 'production_countries',
                accessor: 'production_countries'
            }, {
                Header: 'release_date',
                accessor: 'release_date'
            }, {
                Header: 'revenue',
                accessor: 'revenue'
            }, {
                Header: 'runtime',
                accessor: 'runtime'
            }, {
                Header: 'spoken_languages',
                accessor: 'spoken_languages'
            }, {
                Header: 'status',
                accessor: 'status'
            }, {
                Header: 'tagline',
                accessor: 'tagline'
            }, {
                Header: 'video',
                accessor: 'video'
            }, {
                Header: 'vote_average',
                accessor: 'vote_average'
            }, {
                Header: 'vote_count',
                accessor: 'vote_count'
            }, {
                Header: 'adult',
                accessor: 'adult',
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "True") {
                      return row[filter.id] == "True";
                    }
                    return row[filter.id] == "False";
                },
                Filter: ({ filter, onChange }) => 
                <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                >
                <option value="all">All</option>
                <option value="True">True</option>
                <option value="False">False</option>
                </select>                
            },
        ]
       
        const domain = [0, 100];
        const values = [10, 20];
        const sliderStyle = {  // Give the slider some width
            position: 'relative',
            width: '100%',
            height: 80,
            border: '1px solid steelblue',
        }

        const railStyle = { 
            position: 'absolute',
            width: '100%',
            height: 10,
            marginTop: 35,
            borderRadius: 5,
            backgroundColor: '#8B9CB6',
          }

        return( <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        loading={loading}
                        filterable
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />

                    {/* <Slider
                        mode={1}
                        step={1}
                        domain={domain}
                        rootStyle={sliderStyle}
                        // onChange={this.onChange}
                        values={values}
                        >
                        <Rail>
                            {({ getRailProps }) => (
                            <div style={railStyle} {...getRailProps()} />
                            )}
                        </Rail>
                        <Handles>
                            {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={domain}
                                    getHandleProps={getHandleProps}
                                />
                                ))}
                            </div>
                            )}
                        </Handles>
                        <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                                ))}
                            </div>
                            )}
                        </Tracks>
                        <Ticks count={10}>
                            {({ ticks }) => (
                            <div className="slider-ticks">
                                {ticks.map(tick => (
                                <Tick key={tick.id} tick={tick} count={ticks.length} />
                                ))}
                            </div>
                            )}
                        </Ticks>
                    </Slider> */}
                </div> 
        );
    }

}

export default DataTable;

// ReactDOM.render(<Table />, document.getElementById('dataset'));

// method 2
// {<ReactTable 
// data={this.state}
// columns={[
//     {
//         Header:'overview',
//         accessor:'overview'
//     },
//     {
//         Header:'budget',
//         accessor:'budget'
//     }
// ]}
// defaultPageSize={10}
// className='-striped -highlight'
// ></ReactTable>}