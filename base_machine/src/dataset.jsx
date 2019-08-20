import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter , numberFilter, textFilter } from 'react-bootstrap-table2-filter';
import History from './history.jsx'

//style; filter/sort on columns
//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Column%20Filter&selectedStory=Select%20Filter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

class Dataset extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            dataset: [
                {
                    'name':'aaa',
                    'age':10,
                },
                {
                    'name':'bbb',
                    'age':11,
                },
                {
                    'name':'ccc',
                    'age':12,
                }
            ],
        };

        // this.state.dataset.map((t) => {
        //     console.log(t);
        //     console.log(t.name);
        // });

        // this.createTable = this.createTable.bind(this);
        // this.generateTableHead = this.generateTableHead.bind(this);
        this.fetchDataset = this.fetchDataset.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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
            .then((data) => {
                console.log(data)
                this.setState({
                    dataset: data.dataset,
                });
                // this.generateTableHead();
                // this.createTable();
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }


    // postData(url = '', data = {}) {
    // // Default options are marked with *
    //     return fetch(url, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'cors', // no-cors, cors, *same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrer: 'no-referrer', // no-referrer, *client
    //         body: JSON.stringify(data), // body data type must match "Content-Type" header
    //     })
    //     .then(response => response.json()); // parses JSON response into native JavaScript objects 
    // }

    // handleSubmit() {
    //     let question=document.getElementById('question').value;
    //     // how to filter open-ended questions?
    //     this.postData('/fetch_question/', {question:question}) 
    //     .then(data => {
    //         console.log(data)
    //     }) // JSON-string from `response.json()` call
    //     .catch(error => console.error(error));
    // }        

    // TODO:
    // table style
    // https://stackoverflow.com/questions/14136076/scroll-bar-for-a-table-cell
    // createTable(){
    //     // console.log('call createTable');
    //     let table=document.getElementById('dataset');
    //     for (let element of this.state.dataset){
    //         let row=table.insertRow();
    //         for (let key in element){
    //             let cell=row.insertCell();
    //             let text=document.createTextNode(element[key]); // typeof element[key] is string 
    //             cell.appendChild(text);
    //         }
    //     }
    // }

    // generateTableHead(){
    //     // console.log('call createTableHead');
    //     let table=document.getElementById('dataset');
    //     let thead=table.createTHead();
    //     let row=thead.insertRow();

    //     for (let key in this.state.dataset[0]){
    //         let th=document.createElement('th');
    //         let text=document.createTextNode(key);
    //         th.appendChild(text);
    //         row.appendChild(th);
    //     }
    // }
      

    render() {
        const headerSortingStyle = { backgroundColor: 'grey' };

        const selectOriginalLanguage = {
            'ab': 'ab', 'af': 'af', 'am': 'am', 'ar': 'ar', 'ay': 'ay', 'bg': 'bg', 'bm': 'bm',
            'bn': 'bn', 'bo': 'bo', 'bs': 'bs', 'ca': 'ca', 'cn': 'cn', 'cs': 'cs', 'cy': 'cy',
            'da': 'da', 'de': 'de', 'el': 'el', 'en': 'en', 'eo': 'eo', 'es': 'es', 'et': 'et', 'eu': 'eu', 'fa': 'fa',
            'fi': 'fi', 'fr': 'fr', 'fy': 'fy', 'gl': 'gl', 'he': 'he',
            'hi': 'hi', 'hr': 'hr', 'hu': 'hu', 'hy': 'hy', 'id': 'id', 'is': 'is', 'it': 'it', 'iu': 'iu', 'ja': 'ja',
            'jv': 'jv', 'ka': 'ka', 'kk': 'kk', 'kn': 'kn', 'ko': 'ko', 'ku': 'ku', 'ky': 'ky', 'la': 'la',
            'lb': 'lb', 'lo': 'lo', 'lt': 'lt', 'lv': 'lv', 'mk': 'mk', 'ml': 'ml', 'mn': 'mn', 'mr': 'mr',
            'ms': 'ms', 'mt': 'mt', 'nb': 'nb', 'ne': 'ne', 'nl': 'nl', 'no': 'no', 'null': 'null', 
            'pa': 'pa', 'pl': 'pl', 'ps': 'ps', 'pt': 'pt', 'qu': 'qu', 'ro': 'ro', 'ru': 'ru', 'rw': 'rw',
            'sh': 'sh', 'si': 'si', 'sk': 'sk', 'sl': 'sl', 'sm': 'sm', 'sq': 'sp', 'sr': 'sr',
            'sv': 'sv', 'ta': 'ta', 'te': 'te', 'tg': 'tg', 'th': 'th', 'tl': 'tl', 'tr': 'tr',
            'uk': 'uk', 'ur': 'ur', 'uz': 'uz', 'vi': 'vi', 'wo': 'wo', 'xx': 'xx', 
            'zh': 'zh', 'zu': 'zu'
        }

        const selectLanguage = {
            // 'dataset_value':'option in the drop down list'
            'en': 'en', 
            'fr': 'fr',
            'ab': 'ab',
            'af': 'af', 
            'am': 'am', 
            'ar': 'ar',
            'as': 'as', 
            'ay': 'ay', 
            'az': 'az', 
            'be': 'be', 
            'bg': 'bg', 
            'bi': 'bu', 
            'bm': 'bm',
            'bn': 'bn', 
            'bo': 'bo', 
            'br': 'br', 
            'bs': 'bs', 
            'ca': 'ca', 
            'ce': 'ce', 
            'cn': 'cn', 
            'co': 'co', 
            'cr': 'cr', 
            'cs': 'cs', 
            'cy': 'cy',
            'da': 'da', 'de': 'de', 'dz': 'dz', 'el': 'el', 'en': 'en', 'eo': 'eo', 'es': 'es', 'et': 'es', 'eu': 'eu', 'fa': 'fa', 'ff': 'ff',
            'fi': 'fi', 'fo': 'fo', 'fr': 'fr', 'fy': 'fy', 'ga': 'ga', 'gd': 'gd', 'gl': 'gl', 'gn': 'gn', 'gu': 'gu', 'ha': 'ha', 'he': 'he',
            'hi': 'hi', 'hr': 'hr', 'ht': 'ht', 'hu': 'hu', 'hy': 'hy', 'id': 'id', 'ig': 'ig', 'is': 'is', 'it': 'it', 'iu': 'iu', 'ja': 'ja',
            'jv': 'jv', 'ka': 'ka', 'ki': 'ki', 'kk': 'kk', 'km': 'km', 'kn': 'kn', 'ko': 'ko', 'ku': 'ku', 'kw': 'kw', 'ky': 'ky', 'la': 'la',
            'lb': 'lb', 'ln': 'ln', 'lo': 'lo', 'lt': 'lt', 'lv': 'lv', 'mh': 'mh', 'mi': 'mi', 'mk': 'mk', 'ml': 'ml', 'mn': 'mn', 'mr': 'mr',
            'ms': 'ms', 'mt': 'mt', 'my': 'my', 'nb': 'nb', 'ne': 'ne', 'nl': 'nl', 'no': 'no', 'null': 'null', 'nv': 'nv', 'ny': 'ny', 'oc': 'oc',
            'pa': 'pa', 'pl': 'pl', 'ps': 'ps', 'pt': 'pt', 'qu': 'qu', 'ro': 'ro', 'ru': 'ru', 'rw': 'rw', 'sa': 'sa', 'sc': 'sc', 'se': 'se',
            'sg': 'sg', 'sh': 'sh', 'si': 'si', 'sk': 'sk', 'sl': 'sl', 'sm': 'sm', 'sn': 'sn', 'so': 'so', 'sq': 'sp', 'sr': 'sr', 'st': 'st',
            'sv': 'sv', 'sw': 'sw', 'ta': 'ta', 'te': 'te', 'tg': 'tg', 'th': 'th', 'tk': 'tk', 'tl': 'tl', 'tn': 'tn', 'to': 'to', 'tr': 'tr',
            'tt': 'tt', 'ty': 'ty', 'ug': 'ug', 'uk': 'uk', 'ur': 'ur', 'uz': 'uz', 'vi': 'vi', 'wo': 'wo', 'xh': 'xh', 'xx': 'xx', 'yi': 'yi',
            'zh': 'zh', 'zu': 'zu'
        };

        // let budgetFilter;
        // let overviewFilter;

        const columns=[
            {
                dataField: 'id',
                text: 'id',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'imdb_id',
                text:'imdb_id',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'title',
                text:'title',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'adult',
                text:'adult',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'belongs_to_collection',
                text:'belongs_to_collection',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'budget',
                text:'budget',
                sort: true,
                headerSortingStyle,
                filter: numberFilter(),
                // filter: numberFilter({
                //     getFilter: (filter) => {
                //       budgetFilter = filter;
                //     }
                //   })
            },
            {
                dataField:'genres',
                text:'genres',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'homepage',
                text:'homepage',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'original_language',
                text:'original_language',
                sort: true,
                headerSortingStyle,
                formatter: cell => selectLanguage[cell],
                filter: selectFilter({
                  options: selectLanguage
                })
            },
            {
                dataField:'original_title',
                text:'original_title',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'overview',
                text:'overview',
                sort: true,
                headerSortingStyle,
                filter: textFilter(),
                // filter: textFilter({
                //     getFilter: (filter) => {
                //       overviewFilter = filter;
                //     }
                //   }),
                style: {
                    backgroundColor: '#c8e6c9',
                    width:'100px',
                    height: '100px',
                    overflow: 'scroll',
                }
            },
            {
                dataField:'popularity',
                text:'popularity',
                sort: true,
                headerSortingStyle,
                filter: numberFilter(),
            },
            {
                dataField:'poster_path',
                text:'poster_path',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'production_companies',
                text:'production_companies',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'production_countries',
                text:'production_countries',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'release_date',
                text:'release_date',
                sort: true,
                headerSortingStyle,
                filter: numberFilter(),
            },
            {
                dataField:'revenue',
                text:'revenue',
                sort: true,
                headerSortingStyle,
                filter: numberFilter(),
            },
            {
                dataField:'runtime',
                text:'runtime',
                sort: true,
                headerSortingStyle,
                filter: numberFilter(),
            },
            {
                dataField:'spoken_languages',
                text:'spoken_languages',
                sort: true,
                headerSortingStyle,
                formatter: cell => selectLanguage[cell],
                filter: selectFilter({
                    options: selectLanguage
                })
            },
            {
                dataField:'status',
                text:'status',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'tagline',
                text:'tagline',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'video',
                text:'video',
                sort: true,
                headerSortingStyle
            },
            {
                dataField:'vote_average',
                text:'vote_average',
                sort: true,
                headerSortingStyle,
                filter:numberFilter(),
            },
            {
                dataField:'vote_count',
                text:'vote_count',
                sort: true,
                headerSortingStyle,
                filter:numberFilter(),
            },
        ];

        // const handleClearFilter = () => {
        //     budgetFilter();
        //     overviewFilter('');
        // };

        // const columns=this.getColumns();

        // const defaultSorted=[
        //     {
        //         dataField:'id',
        //         order:'asc',
        //     }
        // ];

        // const rowStyle = {
        //     backgroundColor: '#c8e6c9',
        //     height:'100px',
        //     overflow:'scroll',
        // };


        return( <div>
                    <History />
                    {/* <input 
                    id='question'
                    type='text' 
                    placeholder='Type your question here.'></input>
                    <button 
                    onClick={()=>this.handleSubmit()}>Submit</button> */}

                    {/* <table
                    id='dataset'
                    className='dataset'></table> */}

                    {/* <button 
                    className="btn btn-lg btn-primary" 
                    onClick={ handleClearFilter }> Clear all filters </button> */}

                    <BootstrapTable
                    keyField='id' 
                    data={ this.state.dataset } 
                    columns={ columns }
                    striped
                    hover
                    condensed
                    // defaultSorted={defaultSorted}
                    // rowStyle={rowStyle}
                    pagination={ paginationFactory() }
                    filter={ filterFactory() } />

                </div> 
        );
    }

}

export default Dataset;

//ReactDOM.render(<Dataset />, document.getElementById('dataset'));



// another two ways to create table
// method 1
// {<table>
//     <tbody>{this.props.dataset.map(function(item,key){
//         return(
//             <tr key={key}>
//                 <td>{item.adult}</td>
//                 <td>{item.budget}</td>
//                 <td>{item.overview}</td>
//                 <td>{item.genres.name}</td>
//             </tr>
//         )

//     })}</tbody>
// </table>}

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