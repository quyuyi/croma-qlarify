import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './slider-components.jsx'


class DataTable extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            data: [],
            loading: true,
            filtered: [],
        };

        this.fetchDataset = this.fetchDataset.bind(this);
        this.onTableViewChange = this.onTableViewChange.bind(this);
        this.onFilteredChangeCustom = this.onFilteredChangeCustom.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
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

    // sent the current filtered dataset to server.py
    // update the ranked feature list
    onTableViewChange (){
        setTimeout(()=>{
            const currentState = this.reactTable.getResolvedState()
            const currentData = currentState.sortedData;
            // console.log("print from onTableViewChange in table.jsx")
            // console.log(currentData);
            let currentIndices=[];
            currentData.forEach(ele => {
                currentIndices.push(ele['_index'])            
            });
            console.log("current dataset size:")
            console.log(currentIndices.length)
    
            if (currentIndices === undefined || currentIndices.length == 0){
                // console.log("print from else condition")
                this.props.callbackFromParent([])
            }
            else {
                this.postData('/update_features/', {currentIndices: currentIndices})
                .then(data => {
                    // console.log("print from onTableViewChange")
                    // console.log(data.rules)
                    this.props.callbackFromParent(data.rules)
                }) // JSON-string from `response.json()` call
                .catch(error => console.error(error));
            }
        }
        ,500)
    }





    onFilteredChangeCustom (value, accessor, type='') {
        let filtered = this.state.filtered;
        let insertNewFilter = 1;
    
        console.log(filtered)
        if (filtered.length) {
          filtered.forEach((filter, i) => {
            if (filter["id"] === accessor) {
              // check whether to remove the filter
              if (
                value === "" || !value.length || value === "all" 
                // || (value.length == 1 && value[0]==="all")
                || (accessor=='budget' && value.length==2 && value[0]==allDomain['budget'][0] && value[1]==allDomain['budget'][1])
                || (accessor=='popularity' && value.length==2 && value[0]==allDomain['popularity'][0] && value[1]==allDomain['popularity'][1])
                || (accessor=='revenue' && value.length==2 && value[0]==allDomain['revenue'][0] && value[1]==allDomain['revenue'][1])
                || (accessor=='runtime' && value.length==2 && value[0]==allDomain['runtime'][0] && value[1]==allDomain['runtime'][1])
                || (accessor=='vote_average' && value.length==2 && value[0]==allDomain['vote_average'][0] && value[1]==allDomain['vote_average'][1])
                || (accessor=='vote_count' && value.length==2 && value[0]==allDomain['vote_count'][0] && value[1]==allDomain['vote_count'][1])
                ) 
              {
                  // remove the filter
                  filtered.splice(i, 1);
              }

              // update the filter
              else if (type===''){
                filter["value"] = value;
              }
              else {
                filter['type'] = type;
              }
    
              insertNewFilter = 0;
            }
          });
        }
    
        // insert new filter
        if (insertNewFilter) {
          if (type===''){
              type='or';
          }
          filtered.push({ id: accessor, value: value, type: type});
        }
    
        this.setState({ filtered: filtered });

        this.onTableViewChange();
    };


    handleSliderChange (range,accessor) {
        this.onFilteredChangeCustom(range,accessor)
    }


    render() {
        const { data, loading } = this.state;
        const columns = [
            {
               Header: 'id',
               accessor: 'id',
               // do we need exact match for id and imdb_id?
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["id"] }),
               filterAll: true,
            }, {
               Header: 'imdb_id',
               accessor: 'imdb_id',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["imdb_id"] }),
               filterAll: true,
            }, {
               Header: 'title',
               accessor: 'title',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["title"] }),
               filterAll: true,
            }, {
               Header: 'belongs_to_collection',
               accessor: 'belongs_to_collection',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["belongs_to_collection"] }),
               filterAll: true,
            }, {
               Header: 'budget',
               accessor: 'budget',
               filterMethod: rangeFilter,
               Filter: ({filter,onChange}) => {
                   const domain=allDomain['budget'];
                   return (
                       <SliderCustom 
                       domain={domain}
                       values={filter ? filter.value : domain}
                       handleSliderChange={this.handleSliderChange}
                       accessor='budget'
                       />
                   );
               },

            }, {
               Header: 'genres',
               accessor: 'genres',
               filterMethod: multiSelectionFilter,
               Filter: ({filter,onChange}) => {
                    return (
                        <MultiSelection
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        type={filter ? filter.type : 'or'}
                        value={filter ? filter.value : ["all"]}
                        accessor='genres'
                        />
                    );
               }
            }, {
               Header: 'homepage',
               accessor: 'homepage',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["homepage"] }),
               filterAll: true,
            }, {
               Header: 'original_language',
               accessor: 'original_language'
            }, {
               Header: 'original_title',
               accessor: 'original_title',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["original_title"] }),
               filterAll: true,
            }, {
               Header: 'overview',
               accessor: 'overview',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["overview"] }),
               filterAll: true,
            }, {
               Header: 'popularity',
               accessor: 'popularity',
               filterMethod: rangeFilter,
               Filter: ({filter,onChange}) => {
                    const domain=allDomain['popularity'];
                    return (
                        <SliderCustom 
                        domain={domain}
                        values={filter ? filter.value : domain}
                        handleSliderChange={this.handleSliderChange}
                        accessor='popularity'
                        />
                    );
                },

            }, {
               Header: 'poster_path',
               accessor: 'poster_path',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["poster_path"] }),
               filterAll: true,
            }, {
               Header: 'production_companies',
               accessor: 'production_companies',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["peoduction_companies"] }),
               filterAll: true,
            }, {
                Header: 'production_countries',
                accessor: 'production_countries'
            }, {
                Header: 'release_date',
                accessor: 'release_date'
            }, {
                Header: 'revenue',
                accessor: 'revenue',
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['revenue']
                    return (
                        <SliderCustom 
                        domain={domain}
                        values={filter ? filter.value : domain}
                        handleSliderChange={this.handleSliderChange}
                        accessor='revenue'
                        />
                    );
                },
            }, {
                Header: 'runtime',
                accessor: 'runtime',
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['runtime'];
                    return (
                        <SliderCustom 
                        domain={domain}
                        values={filter ? filter.value : domain}
                        handleSliderChange={this.handleSliderChange}
                        accessor='runtime'
                        />
                    );
                },

            }, {
                Header: 'spoken_languages',
                accessor: 'spoken_languages',
                filterMethod: multiSelectionFilter,
                Filter: ({filter,onChange}) => {
                     return (
                         <MultiSelection
                         onFilteredChangeCustom={this.onFilteredChangeCustom}
                         type={filter ? filter.type : 'or'}
                         value={filter ? filter.value : ["all"]}
                         accessor='spoken_languages'
                         />
                     );
                }
            }, {
                Header: 'status',
                accessor: 'status',
                filterMethod: multiSelectionFilter,
                Filter: ({filter,onChange}) => {
                    return (
                        <MultiSelection
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        type={filter ? filter.type : 'or'}
                        value={filter ? filter.value : ["all"]}
                        accessor='status'
                        />
                    );
               }
            }, {
                Header: 'tagline',
                accessor: 'tagline',
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["tagline"] }),
                filterAll: true,
            }, {
                Header: 'video',
                accessor: 'video'
            }, {
                Header: 'vote_average',
                accessor: 'vote_average',
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['vote_average'];
                    return (
                        <SliderCustom 
                        domain={domain}
                        values={filter ? filter.value : domain}
                        handleSliderChange={this.handleSliderChange}
                        accessor='vote_average'
                        />
                    );
                },
            }, {
                Header: 'vote_count',
                accessor: 'vote_count',
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['vote_count'];
                    return (
                        <SliderCustom 
                        domain={domain}
                        values={filter ? filter.value : domain}
                        handleSliderChange={this.handleSliderChange}
                        accessor='vote_count'
                        />
                    );
                },
            }, {
                Header: 'adult',
                accessor: 'adult',
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    else if (filter.value === "True") {
                      return row[filter.id] == "True";
                    }
                    else if (filter.value === "False"){
                        return row[filter.id] == "False";
                    }
                },
                Filter: ({ filter, onChange }) => 
                <select
                onChange={event => {
                    console.log('filtering....');
                    console.log(event.target.value);
                    return onChange(event.target.value);
                }}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                >
                <option value="all">All</option>
                <option value="True">True</option>
                <option value="False">False</option>
                </select>                
            },
        ]
       
        return( <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        loading={loading}
                        filterable
                        filtered={this.state.filtered}

                        onFilteredChange={(filtered, column, value) => {
                          this.onFilteredChangeCustom(value, column.id || column.accessor);
                        }}

                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id;
                            if (typeof filter.value === "object") {
                              return row[id] !== undefined
                                ? filter.value.indexOf(row[id]) > -1
                                : true;
                            } else {
                              return row[id] !== undefined
                                ? String(row[id]).indexOf(filter.value) > -1
                                : true;
                            }
                          }}

                        // defaultFilterMethod={(filter, row) => 
                        //     String(row[filter.id]) === filter.value}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        ref={(r) => {this.reactTable = r;}}
                    />
                </div> 
        );
    }

}


const budgetDomain=[0,380000000];
const popularityDomain=[0,548];
const revenueDomain=[0,2787965087];
const runtimeDmain=[0,840];
const vote_averageDomain=[0,10];
const vote_countDomain=[0,14075];
const allDomain={
    'budget': budgetDomain,
    'popularity': popularityDomain,
    'revenue': revenueDomain,
    'runtime': runtimeDmain,
    'vote_average': vote_averageDomain,
    'vote_count': vote_countDomain,
};


const genresOptions=[
'Action', 'Adventure', 'Animation', 'Aniplex', 'BROSTA TV', 'Comedy', 'Crime',
'Documentary', 'Drama', 'Family', 'Fantasy', 'Foreign', 'GoHands', 'History',
'Horror', 'Mardock Scramble Production Committee', 'Music', 'Mystery',
'Romance', 'Science Fiction', 'Sentai Filmworks', 'TV Movie', 'Thriller',
'War', 'Western', 'null'
];

const statusOptions=[
'Canceled', 'In Production', 'Planned','Post Production','Released', 
'Rumored', 'nan'// nan does not work?
];

const original_languageOptions=[
'ab','af','am','ar','ay','bg','bm','bn','bo','bs','ca','cn','cs','cy','da','de',
'el','en','eo','es','et','eu','fa','fi','fr','fy','gl','he','hi','hr','hu','hy',
'id','is','it','iu','ja','jv','ka','kk','kn','ko','ku','ky','la','lb','lo','lt',
'lv','mk','ml','mn','mr','ms','mt','nb','ne','nl','no','null','pa','pl','ps','pt',
'qu','ro','ru','rw','sh','si','sk','sl','sm','sq','sr','sv','ta','te','tg','th',
'tl','tr','uk','ur','uz','vi','wo','xx','zh','zu'
];

const spoken_languagesOptions=[
'ab','af','am','ar','as','ay','az','be','bg','bi','bm','bn','bo','br','bs','ca',
'ce','cn','co','cr','cs','cy','da','de','dz','el','en','eo','es','et','eu','fa',
'ff','fi','fo','fr','fy','ga','gd','gl','gn','gu','ha','he','hi','hr','ht','hu',
'hy','id','ig','is','it','iu','ja','jv','ka','ki','kk','km','kn','ko','ku','kw',
'ky','la','lb','ln','lo','lt','lv','mh','mi','mk','ml','mn','mr','ms','mt','my',
'nb','ne','nl','no','null','nv','ny','oc','pa','pl','ps','pt','qu','ro','ru','rw',
'sa','sc','se','sg','sh','si','sk','sl','sm','sn','so','sq','sr','st','sv','sw',
'ta','te','tg','th','tk','tl','tn','to','tr','tt','ty','ug','uk','ur','uz','vi',
'wo','xh','xx','yi','zh','zu'
];

const allOptions={
    'genres': genresOptions,
    'status': statusOptions,
    'original_language': original_languageOptions,
    'spoken_languages': spoken_languagesOptions,
};


// function singleSelectionFilter(filter,row){
//     const rowValue = row[filter.id];
//     if (!rowValue) {
//         return true;
//     }

//     const options=allOptions[filter.id]


// }


function multiSelectionFilter(filter,row){
        const rowValue = row[filter.id];
        if (!rowValue) {
            return true;
        }

        const options=allOptions[filter.id];

        if (filter.type=='or'){
            let orTrue=options.some((o) => {
                if (filter.value.indexOf(o) > -1) {
                    return row[filter.id].includes(o);
                }
            });
            if (orTrue){
                return true;
            }
            if (filter.value.indexOf("all") > -1) {
              return true;
            }
        }

        // and condition
        else if (filter.type=='and'){
            let andTrue=options.every((o) => {
                if (filter.value.indexOf(o) > -1) {
                    return row[filter.id].includes(o);
                }
                else {
                    return true;
                }
            });
            if (andTrue){
                return true;
            }
            if (filter.value.indexOf("all") > -1 && andTrue) {
              return true;
            }
        }

        else {
            console.log('wrong filter type for multi selection filter function');
        }
}


// e.g.,
// filter.id = 'budget'
// filter.value= [20,30]
function rangeFilter(filter,row){
    const rowValue = row[filter.id];
    // TODO:
    // not filter out when budget = 0???
    // because it's not actually 0, just unknown?
    if (!rowValue) {
        return true;
    }

    if (rowValue=='null'){
        return true;
    }

    if (filter.value.length==2){
        const left=filter.value[0];
        const right=filter.value[1];
        if (rowValue>=left && rowValue<=right){
            return true;
        }
    }

    else {
        return true;
    }

}



class SliderCustom extends React.Component {

    render () {
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

        return (
            <Slider
            mode={1}
            step={1}
            domain={this.props.domain}
            rootStyle={sliderStyle}
            onChange={values => this.props.handleSliderChange(values,this.props.accessor)}
            values={this.props.values}
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
                        domain={this.props.domain}
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
        </Slider>
        );
    }
}

class MultiSelection extends React.Component{

    render (){
        const options=allOptions[this.props.accessor];

        return (
          <div>

            <select
            onChange={event => {
                let type=event.target.value;
                this.props.onFilteredChangeCustom(this.props.value,this.props.accessor, type);
            }}
            style={{ width: "50%" }}
            value={this.props.type}
            >
                <option value='or'>Or</option>
                <option value='and'>And</option>
            </select>

            <select
            onChange={event => {
                let selectedOptions = [].slice
                .call(event.target.selectedOptions)
                .map(o => {
                    return o.value;
                });
                this.props.onFilteredChangeCustom(selectedOptions,this.props.accessor);
            }}
            style={{ width: "50%" }}
            value={this.props.value}
            multiple={true}
            >
            <option key='all' value="all">Show All</option>
            {options.map((o) => {
                return <option key={o} value={o}>{o}</option>
            })}
            </select>

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



// Filter not using component
// Filter: ({ filter, onChange }) => {
//     const options=allOptions['status'];
//     return (
//       <select
//         onChange={event => {
//           let selectedOptions = [].slice
//             .call(event.target.selectedOptions)
//             .map(o => {
//               return o.value;
//             });
//             this.onFilteredChangeCustom(selectedOptions,'status');
//         }}
//         style={{ width: "100%" }}
//         value={filter ? filter.value : ["all"]}
//         multiple={true}
//       >
//         <option value="all">Show All</option>
//         {options.map((o) => {
//             return <option value={o}>{o}</option>
//         })}
//       </select>
//     );
// }