import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter , numberFilter, textFilter, Comparator, multiSelectFilter } from 'react-bootstrap-table2-filter';
import History from './history.jsx'
import PropTypes from 'prop-types';


// import Code from 'components';

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
};

const selectStatus = {
    'Canceled': 'Canceled', 
    'In Production': 'In Production', 
    'Planned': 'Planned', 
    'Post Production': 'Post Production',
    'Released': 'Released', 
    'Rumored': 'Rumored', 
    'nan': 'nan',// not work
};

const selectGenres = {
    'Action': 'Action',
    'Adventure': 'Adventure',
    'Animation': 'Animation',
    'Aniplex': 'Aniplex',
    'BROSTA TV': 'BROSTA TV',
    'Carousel Productions': 'Carousel Productions',
    'Comedy': 'Comedy',
    'Crime': 'Crime',
    'Documentary': 'Documentary',
    'Drama': 'Drama',
    'Family': 'Family',
    'Fantasy': 'Fantasy',
    'Foreign': 'Foreign',
    'GoHands': 'GoHands',
    'History': 'History',
    'Horror': 'Horror',
    'Mardock Scramble Production Committee': 'Mardock Scramble Production Committee',
    'Music': 'Music',
    'Mystery': 'Mystery',
    'Odyssey Media': 'Odyssey Media',
    'Pulser Productions': 'Pulser Productions',
    'Rogue State': 'Rogue State',
    'Romance': 'Romance',
    'Science Fiction': 'Science Fiction',
    'Sentai Filmworks': 'Sentai Filmworks',
    'TV Movie': 'TV Movie',
    'Telescene Film Group Productions': 'Telescene Film Group Productions',
    'The Cartel': 'The Cartel',
    'Thriller': 'Thriller',
    'Vision View Entertainment': 'Vision View Entertainment',
    'War': 'War',
    'Western': 'Western',
    'null': 'null',
};

const selectSpokenLanguages = {
    // 'dataset_value':'option in the drop down list'
    // dataset_value will be shown as the matched option
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
    'da': 'da', 'de': 'de', 'dz': 'dz', 'el': 'el', 'en': 'en', 'eo': 'eo', 'es': 'es', 'et': 'et', 'eu': 'eu', 'fa': 'fa', 'ff': 'ff',
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

const selectProductionCountries = {
    'Afghanistan': 'Afghanistan',
    'Albania': 'Albania',
    'Algeria': 'Algeria',
    'Angola': 'Angola',
    'Antarctica': 'Antarctica',
    'Argentina': 'Argentina',
    'Armenia': 'Armenia',
    'Aruba': 'Aruba',
    'Australia': 'Australia',
    'Austria': 'Austria',
    'Azerbaijan': 'Azerbaijan',
    'Bahamas': 'Bahamas',
    'Bangladesh': 'Bangladesh',
    'Barbados': 'Barbados',
    'Belarus': 'Belarus',
    'Belgium': 'Belgium',
    'Bermuda': 'Bermuda',
    'Bhutan': 'Bhutan',
    'Bolivia': 'Bolivia',
    'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
    'Botswana': 'Botswana',
    'Brazil': 'Brazil',
    'Brunei Darussalam': 'Brunei Darussalam',
    'Bulgaria': 'Bulgaria',
    'Burkina Faso': 'Burkina Faso',
    'Cambodia': 'Cambodia',
    'Cameroon': 'Cameroon',
    'Canada': 'Canada',
    'Cayman Islands': 'Cayman Islands',
    'Chad': 'Chad',
    'Chile': 'Chile',
    'China': 'China',
    'Colombia': 'Colombia',
    'Congo': 'Congo',
    'Costa Rica': 'Costa Rica',
    "Cote D'Ivoire": "Cote D'Ivoire",
    'Croatia': 'Croatia',
    'Cuba': 'Cuba',
    'Cyprus': 'Cyprus',
    'Czech Republic': 'Czech Republic',
    'Czechoslovakia': 'Czechoslovakia',
    'Denmark': 'Denmark',
    'Dominican Republic': 'Dominican Republic',
    'East Germany': 'East Germany',
    'Ecuador': 'Ecuador',
    'Egypt': 'Egypt',
    'El Salvador': 'El Salvador',
    'Estonia': 'Estonia',
    'Ethiopia': 'Ethiopia',
    'Finland': 'Finland',
    'France': 'France',
    'French Polynesia': 'French Polynesia',
    'French Southern Territories': 'French Southern Territories',
    'Georgia': 'Georgia',
    'Germany': 'Germany',
    'Ghana': 'Ghana',
    'Gibraltar': 'Gibraltar',
    'Greece': 'Greece',
    'Guatemala': 'Guatemala',
    'Guinea': 'Guinea',
    'Honduras': 'Honduras',
    'Hong Kong': 'Hong Kong',
    'Hungary': 'Hungary',
    'Iceland': 'Iceland',
    'India': 'India',
    'Indonesia': 'Indonesia',
    'Iran': 'Iran',
    'Iraq': 'Iraq',
    'Ireland': 'Ireland',
    'Israel': 'Israel',
    'Italy': 'Italy',
    'Jamaica': 'Jamaica',
    'Japan': 'Japan',
    'Jordan': 'Jordan',
    'Kazakhstan': 'Kazakhstan',
    'Kenya': 'Kenya',
    'Kuwait': 'Kuwait',
    'Kyrgyz Republic': 'Kyrgyz Republic',
    "Lao People's Democratic Republic": "Lao People's Democratic Republic",
    'Latvia': 'Latvia',
    'Lebanon': 'Lebanon',
    'Liberia': 'Liberia',
    'Libyan Arab Jamahiriya': 'Libyan Arab Jamahiriya',
    'Liechtenstein': 'Liechtenstein',
    'Lithuania': 'Lithuania',
    'Luxembourg': 'Luxembourg',
    'Macao': 'Macao',
    'Macedonia': 'Macedonia',
    'Madagascar': 'Madagascar',
    'Malaysia': 'Malaysia',
    'Mali': 'Mali',
    'Malta': 'Malta',
    'Martinique': 'Martinique',
    'Mauritania': 'Mauritania',
    'Mexico': 'Mexico',
    'Moldova': 'Moldova',
    'Monaco': 'Monaco',
    'Mongolia': 'Mongolia',
    'Montenegro': 'Montenegro',
    'Morocco': 'Morocco',
    'Myanmar': 'Myanmar',
    'Namibia': 'Namibia',
    'Nepal': 'Nepal',
    'Netherlands': 'Netherlands',
    'Netherlands Antilles': 'Netherlands Antilles',
    'New Zealand': 'New Zealand',
    'Nicaragua': 'Nicaragua',
    'Nigeria': 'Nigeria',
    'North Korea': 'North Korea',
    'Norway': 'Norway',
    'Pakistan': 'Pakistan',
    'Palestinian Territory': 'Palestinian Territory',
    'Panama': 'Panama',
    'Papua New Guinea': 'Papua New Guinea',
    'Paraguay': 'Paraguay',
    'Peru': 'Peru',
    'Philippines': 'Philippines',
    'Poland': 'Poland',
    'Portugal': 'Portugal',
    'Puerto Rico': 'Puerto Rico',
    'Qatar': 'Qatar',
    'Romania': 'Romania',
    'Russia': 'Russia',
    'Rwanda': 'Rwanda',
    'Samoa': 'Samoa',
    'Saudi Arabia': 'Saudi Arabia',
    'Senegal': 'Senegal',
    'Serbia': 'Serbia',
    'Serbia and Montenegro': 'Serbia and Montenegro',
    'Singapore': 'Singapore',
    'Slovakia': 'Slovakia',
    'Slovenia': 'Slovenia',
    'Somalia': 'Somalia',
    'South Africa': 'South Africa',
    'South Korea': 'South Korea',
    'Soviet Union': 'Soviet Union',
    'Spain': 'Spain',
    'Sri Lanka': 'Sri Lanka',
    'Sweden': 'Sweden',
    'Switzerland': 'Switzerland',
    'Syrian Arab Republic': 'Syrian Arab Republic',
    'Taiwan': 'Taiwan',
    'Tajikistan': 'Tajikistan',
    'Tanzania': 'Tanzania',
    'Thailand': 'Thailand',
    'Trinidad and Tobago': 'Trinidad and Tobago',
    'Tunisia': 'Tunisia',
    'Turkey': 'Turkey',
    'Uganda': 'Uganda',
    'Ukraine': 'Ukraine',
    'United Arab Emirates': 'United Arab Emirates',
    'United Kingdom': 'United Kingdom',
    'United States Minor Outlying Islands': 'United States Minor Outlying Islands',
    'United States of America': 'United States of America',
    'Uruguay': 'Uruguay',
    'Uzbekistan': 'Uzbekistan',
    'Venezuela': 'Venezuela',
    'Vietnam': 'Vietnam',
    'Yugoslavia': 'Yugoslavia',
    'Zimbabwe': 'Zimbabwe',
    'null': 'null',
}

const selectAdult = {
    'True': 'True',
    'False': 'False',
};

const selectVideo = {
    'true': 'true',
    'false': 'false',
};

function overviewFormatter(cell,row){
    return (
        <div className='overview'>
            {cell}
        </div>
    );
}

function myHeaderFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        { filterElement }
        {/* <p>{column.text}<i id={column.text} className="fa fa-fw fa-sort"></i></p> */}
        { column.text }
        <i className="fa fa-fw fa-sort"></i>
        { sortElement }
      </div>
    );
}

const headerSortingStyle = { backgroundColor: 'grey' };

const columns=[
    {
        dataField: 'id',
        text: 'id',
        sort: true,
        headerSortingStyle,
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'imdb_id',
        text:'imdb_id',
        sort: true,
        headerFormatter:myHeaderFormatter,
        headerSortingStyle
    },
    {
        dataField:'title',
        text:'title',
        sort: true,
        headerSortingStyle,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter
    },
    {
        dataField:'adult',
        text:'adult',
        sort: true,
        headerSortingStyle,
        filter: selectFilter({
            options: selectAdult,
        }),
        headerFormatter:myHeaderFormatter
    },
    {
        dataField:'belongs_to_collection',
        text:'belongs_to_collection',
        sort: true,
        headerSortingStyle,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'budget',
        text:'budget',
        sort: true,
        headerSortingStyle,
        filter: numberFilter(),
        headerFormatter:myHeaderFormatter,
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
        headerSortingStyle,
        filter: multiSelectFilter({
            options: selectGenres,
            comparator: Comparator.LIKE
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'homepage',
        text:'homepage',
        sort: true,
        headerSortingStyle,
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'original_language',
        text:'original_language',
        sort: true,
        headerSortingStyle,
        formatter: cell => selectOriginalLanguage[cell],
        filter: selectFilter({
            options: selectOriginalLanguage
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'original_title',
        text:'original_title',
        sort: true,
        headerSortingStyle,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'overview',
        text:'overview',
        formatter: overviewFormatter,
        sort: true,
        headerSortingStyle,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter,
        // filter: textFilter({
        //     getFilter: (filter) => {
        //       overviewFilter = filter;
        //     }
        //   }),
        // style: {
        //     backgroundColor: '#c8e6c9',
        //     width:'100px',
        //     height: '100px',
        //     overflow: 'scroll',
        // }
    },
    {
        dataField:'popularity',
        text:'popularity',
        sort: true,
        headerSortingStyle,
        filter: numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'poster_path',
        text:'poster_path',
        sort: true,
        headerSortingStyle,
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'production_companies',
        text:'production_companies',
        sort: true,
        headerSortingStyle,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'production_countries',
        text:'production_countries',
        sort: true,
        headerSortingStyle,
        filter: multiSelectFilter({
            options: selectProductionCountries,
            comparator: Comparator.LIKE,
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'release_date',
        text:'release_date',
        sort: true,
        headerSortingStyle,
        filter: numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'revenue',
        text:'revenue',
        sort: true,
        headerSortingStyle,
        filter: numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'runtime',
        text:'runtime',
        sort: true,
        headerSortingStyle,
        filter: numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'spoken_languages',
        text:'spoken_languages',
        sort: true,
        headerSortingStyle,
        formatter: cell => selectSpokenLanguages[cell],
        filter: multiSelectFilter({
            options: selectSpokenLanguages,
            comparator: Comparator.LIKE,
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'status',
        text:'status',
        sort: true,
        headerSortingStyle,
        formatter: cell => selectStatus[cell],
        filter: selectFilter({
            options: selectStatus
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'tagline',
        text:'tagline',
        sort: true,
        headerSortingStyle,
        formatter: overviewFormatter,
        filter: textFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'video',
        text:'video',
        sort: true,
        headerSortingStyle,
        filter: selectFilter({
            options: selectVideo,
        }),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'vote_average',
        text:'vote_average',
        sort: true,
        headerSortingStyle,
        filter:numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
    {
        dataField:'vote_count',
        text:'vote_count',
        sort: true,
        headerSortingStyle,
        filter:numberFilter(),
        headerFormatter:myHeaderFormatter,
    },
];


const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize}) => (
    <div>
        <BootstrapTable
        remote
        keyField="id"
        data={ data }
        filter={ filterFactory() }
        columns={ columns }
        pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
        onTableChange={ onTableChange }
        noDataIndication={ () => <NoDataIndication /> }
        striped
        hover
        condensed
        headerClasses='header-class'
        />
    </div>
);

const NoDataIndication = () => (
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
);

// const Table = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
//     <div>
//         <BootstrapTable
//         remote
//         keyField="id"
//         data={ data }
//         filter={ filterFactory() }
//         columns={ columns }
//         pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
//         onTableChange={ onTableChange }
//         noDataIndication={ () => <NoDataIndication /> }
//         striped
//         hover
//         condensed
//         />
//     </div>
// );

RemoteAll.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onTableChange: PropTypes.func.isRequired
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      totalSize: 0,
      sizePerPage: 10,
      dataset: []
    };
    this.fetchDataset = this.fetchDataset.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
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
            this.setState({
                dataset: data.dataset,
                data: data.dataset.slice(0,10),
                totalSize: data.dataset.length,
            });
        })
        .catch(error => console.log(error)); // eslint-disable-line no-console
  }

  handleTableChange(type, { page, sizePerPage, filters, sortField, sortOrder }) {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
        let result = this.state.dataset;
        //handle column filters
        print=true;
        result = result.filter((row) => {
            let valid = true;
            for (const dataField in filters) {
              const { filterVal, filterType, comparator } = filters[dataField];

              if (filterType === 'TEXT' || filterType === 'SELECT' || filterType === 'MULTISELECT') {
                if (comparator === Comparator.LIKE) {
                    if(row[dataField]){
                        // valid = row[dataField].toString().indexOf(filterVal) > -1;
                        let s = filterVal;
                        let re = new RegExp(s,"i");
                        valid = re.test(row[dataField]);
                    }
                }
                else { // exact match
                valid = row[dataField] === filterVal;
                }
              }

              else if (filterType === 'NUMBER') {
                //   const value = parseInt(filterVal.number,10);
                  const value = filterVal.number;
                  const number_comparator = filterVal.comparator;
                    if (value != ''){
                        if (number_comparator === '='){
                            valid = row[dataField] == value;
                        }
                        else if (number_comparator === '!=' ){
                            valid = row[dataField] != value;
                        }
                        else if (number_comparator === '>' ){
                            valid = row[dataField] > value;
                        }
                        else if (number_comparator === '>=' ){
                            valid = row[dataField] > value || row[dataField] == value;
                        }
                        else if (number_comparator === '<' ){
                            valid = row[dataField] < value;
                        }
                        else if (number_comparator === '<=' ){
                            valid = row[dataField] < value || row[dataField] == value;
                        }
                    }

              }

              if (!valid) break;
            }
            return valid;
          });
      // Handle column sort
      console.log(sortField);
      if (sortOrder === 'asc') {
        // document.getElementById(sortField).className = "fas fa-sort-up";
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        // document.getElementById(sortField).className = "fas fa-sort-down";
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }        

      if (result.length == 0){
          result=[{"id":"no matched results"}];
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 0);
    this.setState(() => ({ data: [] }));
    console.log(sortField);
  }

  render() {
    const { data, sizePerPage, page } = this.state;

    return( 
    <div>
        <History />
        
        <RemoteAll
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ this.state.totalSize }
        onTableChange={ this.handleTableChange }
        />
    </div> 
    );
  }
}


export default Example;