import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Button from 'react-bootstrap/Button';
import {DelayInput} from 'react-delay-input';
import NumberFormat from 'react-number-format';

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
        this.handleClear = this.handleClear.bind(this);

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
                // this.props.checkFinishLoading(this.state.loading);
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

            console.log("*****on table view change*****");
            console.log("current filters: ");
            console.log(this.state.filtered);
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
        ,0)
    }


    onFilteredChangeCustom (value, accessor, type='') {
        let filtered = this.state.filtered;
        let insertNewFilter = 1;
    
        // console.log(filtered)

        // check whether to remove the filter from the current filters
        if (filtered.length) {
          filtered.forEach((filter, i) => {
            if (filter["id"] === accessor) {
              if (
                value === "" || !value.length || value === "all" 
                // || (value.length == 1 && value[0]==="all")
                || (accessor=='budget' && value.length==2 && value[0]==allDomain['budget'][0] && value[1]==allDomain['budget'][1])
                || (accessor=='popularity' && value.length==2 && value[0]==allDomain['popularity'][0] && value[1]==allDomain['popularity'][1])
                || (accessor=='revenue' && value.length==2 && value[0]==allDomain['revenue'][0] && value[1]==allDomain['revenue'][1])
                || (accessor=='runtime' && value.length==2 && value[0]==allDomain['runtime'][0] && value[1]==allDomain['runtime'][1])
                || (accessor=='vote_average' && value.length==2 && value[0]==allDomain['vote_average'][0] && value[1]==allDomain['vote_average'][1])
                || (accessor=='vote_count' && value.length==2 && value[0]==allDomain['vote_count'][0] && value[1]==allDomain['vote_count'][1])
                || (accessor=='release_date' && value.length==2 && value[0]==allDomain['release_date'][0] && value[1]==allDomain['release_date'][1])
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
    
        // if not exist in the current filters
        // insert new filter
        if (insertNewFilter) {
          if (type===''){
              type='or';
          }
          filtered.push({ id: accessor, value: value, type: type});
        }
    
        this.setState({ filtered: filtered });

        // refresh entropy based on the filtered result
        this.onTableViewChange();
    };


    handleClear(accessor){
        // remove the filter
        let filtered = this.state.filtered;
        if (filtered.length) {
            filtered.forEach((filter, i) => {
              if (filter["id"] === accessor) {
                filtered.splice(i, 1);
              }
            });
        }

        // display the input with domain value
        const left=accessor+"left";
        const right=accessor+"right";
        let leftValue=document.getElementById(left).value;
        console.log("previous left is: ",leftValue);
        document.getElementById(left).value=allDomain[accessor][0];
        console.log("reset left value to ", leftValue);
        let rightValue=document.getElementById(right).value;
        document.getElementById(right).value=allDomain[accessor][1];

        this.onTableViewChange();
    }


    render() {
        const { data, loading } = this.state;
        const width=200;
        const textStyle={ 
            'height': 80,
            'white-space': 'unset',
        };

        const columns = [
            {
               Header: 'id',
               accessor: 'id',
               // do we need exact match for id and imdb_id?
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["id"] }),
               Filter: ({filter,onChange}) => {
                    return (
                        <TextFilter
                        accessor='id'
                        value={filter ? filter.value : ''}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        />
                    );
                },
               filterAll: true,
            }, {
               Header: 'imdb_id',
               accessor: 'imdb_id',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["imdb_id"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='imdb_id'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'title',
               accessor: 'title',
               style: textStyle,
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["title"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='title'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'belongs_to_collection',
               accessor: 'belongs_to_collection',
               style: textStyle,
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["belongs_to_collection"] }),
               Filter: ({filter,onChange}) => {
                   return (
                    <TextFilter
                    accessor='belongs_to_collection'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                   );
               },
               filterAll: true,
            }, {
               Header: 'budget',
               accessor: 'budget',
               width: width,
               filterMethod: rangeFilter,
               Filter: ({filter,onChange}) => {
                   const domain=allDomain['budget'];
                   return (
                    //    <SliderCustom 
                    //    domain={domain}
                    //    values={filter ? filter.value : domain}
                    //    handleSliderChange={this.onFilteredChangeCustom}
                    //    accessor='budget'
                    //    />
                    <RangeSelection
                    range={filter ? filter.value : domain}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    handleClear={this.handleClear}
                    accessor='budget'
                    />
                   );
               },

            }, {
               Header: 'genres',
               accessor: 'genres',
               width: width,
               filterMethod: singleSelectionContains,
               Filter: ({filter,onChange}) => {
                    return (
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='genres'
                        />
                    );
               }
            }, {
               Header: 'homepage',
               accessor: 'homepage',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["homepage"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='homepage'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'original_language',
               accessor: 'original_language',
               filterMethod: singleSelectionExactMatch,
               Filter: ({filter,onChange}) => {
                   return (
                       <SingleSelection
                       value={filter ? filter.value : "all"}
                       onFilteredChangeCustom={this.onFilteredChangeCustom}
                       accessor='original_language'
                       />
                   );
               },
            }, {
               Header: 'original_title',
               accessor: 'original_title',
               style: textStyle,
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["original_title"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='original_title'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'overview',
               accessor: 'overview',
               width: width,
               style: textStyle,
               Cell: row => (
                   <div className='verticalScroll'>{row.value}</div>
               ),
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["overview"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='overview'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'popularity',
               accessor: 'popularity',
               filterMethod: rangeFilter,
               width: width,
               Filter: ({filter,onChange}) => {
                    const domain=allDomain['popularity'];
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='popularity'
                        />
                    );
                },

            }, {
               Header: 'poster_path',
               accessor: 'poster_path',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["poster_path"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='poster_path'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
               Header: 'production_companies',
               accessor: 'production_companies',
               filterMethod: (filter, rows) =>
               matchSorter(rows, filter.value, { keys: ["peoduction_companies"] }),
               Filter: ({filter,onChange}) => {
                return (
                    <TextFilter
                    accessor='production_companies'
                    value={filter ? filter.value : ''}
                    onFilteredChangeCustom={this.onFilteredChangeCustom}
                    />
                );
                },
               filterAll: true,
            }, {
                Header: 'production_countries',
                accessor: 'production_countries',
                width: width,
                filterMethod: singleSelectionContains,
                Filter: ({filter,onChange}) => {
                     return (
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='production_countries'
                        />
                     );
                }
                
            }, {
                Header: 'release_date',
                accessor: 'release_date',
                width: width,
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['release_date'];
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='release_date'
                        />
                    );
                },
            }, {
                Header: 'revenue',
                accessor: 'revenue',
                width: width,
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['revenue']
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='revenue'
                        />
                    );
                },
            }, {
                Header: 'runtime',
                accessor: 'runtime',
                width: width,
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['runtime'];
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='runtime'
                        />
                    );
                },

            }, {
                Header: 'spoken_languages',
                accessor: 'spoken_languages',
                width: width,
                filterMethod: singleSelectionContains,
                Filter: ({filter,onChange}) => {
                     return (
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='spoken_languages'
                        />
                     );
                }
            }, {
                Header: 'status',
                accessor: 'status',
                width: width,
                // filterMethod: multiSelectionFilter,
                filterMethod: singleSelectionContains,
                Filter: ({filter,onChange}) => {
                    return (
                        // <MultiSelection
                        // onFilteredChangeCustom={this.onFilteredChangeCustom}
                        // type={filter ? filter.type : 'or'}
                        // value={filter ? filter.value : ["all"]}
                        // accessor='status'
                        // />
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='status'
                        />
                    );
               }
            }, {
                Header: 'tagline',
                accessor: 'tagline',
                style: textStyle,
                Cell: row => (
                    <div className='verticalScroll'>{row.value}</div>
                ),
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["tagline"] }),
                Filter: ({filter,onChange}) => {
                    return (
                        <TextFilter
                        accessor='tagline'
                        value={filter ? filter.value : ''}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        />
                    );
                },
                filterAll: true,
            }, {
                Header: 'video',
                accessor: 'video',
                filterMethod: singleSelectionExactMatch,
                Filter: ({filter,onChange}) => {
                    return (
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='video'
                        />
                    );
                },
            }, {
                Header: 'vote_average',
                accessor: 'vote_average',
                width: width,
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['vote_average'];
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='vote_average'
                        />
                    );
                },
            }, {
                Header: 'vote_count',
                accessor: 'vote_count',
                width: width,
                filterMethod: rangeFilter,
                Filter: ({filter,onChange}) => {
                    const domain=allDomain['vote_count'];
                    return (
                        <RangeSelection
                        range={filter ? filter.value : domain}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        handleClear={this.handleClear}
                        accessor='vote_count'
                        />
                    );
                },
            }, {
                Header: 'adult',
                accessor: 'adult',
                filterMethod: singleSelectionExactMatch,
                Filter: ({filter,onChange}) => {
                    return (
                        <SingleSelection
                        value={filter ? filter.value : "all"}
                        onFilteredChangeCustom={this.onFilteredChangeCustom}
                        accessor='adult'
                        />
                    );
                },
           
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


const budgetDomain=['0',380000000];
const popularityDomain=['0',548];
const revenueDomain=['0',2787965087];
const runtimeDmain=['0',840];
const vote_averageDomain=['0',10];
const vote_countDomain=['0',14075];
const release_dateDomain=['1874-12-09','2020-12-16'];
// const startDate=new Date(1870,0,1);
// const endDate=new Date(2021,0,0);
// const release_dateDomain=[+startDate,+endDate];
// console.log("release_dateDomain");
// console.log(release_dateDomain);
// console.log([format(startDate,"yyyy-MM-dd"),format(endDate,"yyyy-MM-dd")]);
const allDomain={
    'budget': budgetDomain,
    'popularity': popularityDomain,
    'revenue': revenueDomain,
    'runtime': runtimeDmain,
    'vote_average': vote_averageDomain,
    'vote_count': vote_countDomain,
    'release_date': release_dateDomain,
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

const production_countriesOptions=[
'Afghanistan','Albania','Algeria','Angola','Antarctica','Argentina','Armenia','Aruba',
'Australia','Austria','Azerbaijan','Bahamas','Bangladesh','Barbados','Belarus','Belgium',
'Bermuda','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei Darussalam','Bulgaria',
'Burkina Faso','Cambodia','Cameroon','Canada','Cayman Islands','Chad','Chile','China',
'Colombia','Congo','Costa Rica',"Cote D'Ivoire",'Croatia','Cuba','Cyprus','Czech Republic','Czechoslovakia',
'Denmark','Dominican Republic','East Germany','Ecuador','Egypt','El Salvador',
'Estonia','Ethiopia','Finland','France','French Polynesia','French Southern Territories',
'Georgia','Germany','Ghana','Gibraltar','Greece','Guatemala','Guinea','Honduras',
'Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland',
'Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait',
'Kyrgyz Republic',"Lao People's Democratic Republic",'Latvia','Lebanon','Liberia','Libyan Arab Jamahiriya',
'Liechtenstein','Lithuania','Luxembourg','Macao','Macedonia','Madagascar','Malaysia','Mali',
'Malta','Martinique','Mauritania','Mexico','Moldova','Monaco','Mongolia','Montenegro',
'Morocco','Myanmar','Namibia','Nepal','Netherlands','Netherlands Antilles',
'New Zealand','Nicaragua','Nigeria','North Korea','Norway','Pakistan','Palestinian Territory','Panama',
'Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico','Qatar',
'Romania','Russia','Rwanda','Samoa','Saudi Arabia','Senegal','Serbia','Serbia and Montenegro',
'Singapore','Slovakia','Slovenia','Somalia','South Africa','South Korea','Soviet Union','Spain',
'Sri Lanka','Sweden','Switzerland','Syrian Arab Republic','Taiwan','Tajikistan','Tanzania','Thailand',
'Trinidad and Tobago','Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States Minor Outlying Islands',
'United States of America','Uruguay','Uzbekistan','Venezuela','Vietnam','Yugoslavia','Zimbabwe','null',
];

const adultOptions=[
'True','False'
];

const videoOptions=[
'True','False'
]

const allOptions={
    'genres': genresOptions,
    'status': statusOptions,
    'original_language': original_languageOptions,
    'spoken_languages': spoken_languagesOptions,
    'production_countries': production_countriesOptions,
    'adult': adultOptions,
    'video': videoOptions,
};




function singleSelectionExactMatch(filter,row){
    const rowValue = row[filter.id];
    // if (!rowValue) {
    //     return true;
    // }
    
    if (filter.value==='all'){
        return true;
    }

    else {
        return rowValue==filter.value;
    }

}

function singleSelectionContains(filter,row){
    const rowValue = row[filter.id];

    if (filter.value==='all'){
        return true;
    }

    else {
        return rowValue.includes(filter.value);
    }
}

class TextFilter extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <DelayInput
            delayTimeout={1000} 
            type='text'
            className='text-filter' 
            id={this.props.accessor} 
            value={this.props.value} 
            onChange={e => this.props.onFilteredChangeCustom(e.target.value,this.props.accessor)}
            />
        );
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

    // let processedRowValue;
    // if (filter.id=='release_date'){
    //     const year=parseInt(rowValue.slice(0,4));
    //     const month=parseInt(rowValue.slice(5,7));
    //     const day=parseInt(rowValue.slice(8,10));
    //     processedRowValue=new Date(year,month,day);
    // }
    // else{
    //     processedRowValue=rowValue;
    // }

    const processedRowValue=rowValue;

    if (filter.value.length==2){
        const left=filter.value[0];
        const right=filter.value[1];
        if (processedRowValue>=left 
            && processedRowValue<=right){
            return true;
        }
    }

    else {
        return true;
    }

}



// usage:
{/* <RangeSelection
range={filter ? filter.value : allDomain['budget']}
onFilteredChangeCustom={this.onFilteredChangeCustom}
accessor='budget'
/> */}
class RangeSelection extends React.Component {

    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    checkFormat(v){
        if (this.props.accessor!='release_date'){
            return true;
        }
        else {
            // regular expression to match required date format
            const re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

            if(!v.match(re)) {
                console.log("wrong format");
                alert("Invalid date format: " + v + ". Please enter like this: YYYY-MM-DD");
                return false;
            }
            else {
                return true;
            }
        }
    }

    handleChange(){
        const left=this.props.accessor+"left";
        const right=this.props.accessor+"right";
        const leftValue=document.getElementById(left).value;
        const rightValue=document.getElementById(right).value;
        if (this.checkFormat(leftValue) && this.checkFormat(rightValue)){
            const newRange=[leftValue,rightValue];
            console.log("change range to ", newRange);
            this.props.onFilteredChangeCustom(newRange,this.props.accessor);
        }
    }

    handleReset(){
        this.props.handleClear(this.props.accessor);
    }

    render() {
        const leftId=this.props.accessor+'left';
        const rightId=this.props.accessor+'right';
        let range=this.props.range;
        let type='number';
        let pattern='{*}';
        let format='Input valid numbers';
        if (this.props.accessor=='release_date'){
            type='text';
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}';
            format='format: YYYY-MM-DD';
        }

        return (
            <div>
                <DelayInput 
                delayTimeout={1000} 
                type={type}
                pattern={pattern}
                title={format}
                className='range-input' 
                id={leftId} 
                value={range[0]} 
                onChange={this.handleChange} />
                <DelayInput 
                delayTimeout={1000} 
                type={type}
                title={format}
                pattern={pattern}
                className='range-input' 
                id={rightId} 
                value={range[1]} 
                onChange={this.handleChange} />
                <Button title='Reset range' variant="secondary" size="sm" className='reset' onClick={this.handleReset}></Button>
            </div>
        );

    }
}



class SingleSelection extends React.Component {
    render (){
        const options=allOptions[this.props.accessor];
        return (
            <select
            onChange={event => {
                console.log('filtering....');
                console.log(event.target.value);
                this.props.onFilteredChangeCustom(event.target.value,this.props.accessor);
            }}
            style={{ width: "100%" }}
            value={this.props.value}
            >
            <option value="all">All</option>
            {options.map((o) => {
                return <option value={o}>{o}</option>
            })}
            </select>  
        );
    }
}

export default DataTable;
