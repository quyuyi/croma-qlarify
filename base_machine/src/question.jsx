import { CSSTransition } from 'react-transition-group';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

const notKnow={value:"Don't know", label: "Don't Know"};

const genresOptions=[
    {value: 'Action', label: 'Action'},
    {value: 'Adventure', label: 'Adventure'},
    {value: 'Animation', label: 'Animation'},
    {value: 'Aniplex', label: 'Aniplex'},
    {value: 'BROSTA TV', label: 'BROSTA TV'},
    {value: 'Comedy', label: 'Comedy'},
    {value: 'Crime', label: 'Crime'},
    {value: 'Documentary', label: 'Documentary'},
    {value: 'Drama', label: 'Drama'},
    {value: 'Family', label: 'Family'},
    {value: 'Fantasy', label: 'Fantasy'},
    {value: 'Foreign', label: 'Foreign'},
    {value: 'GoHands', label: 'GoHands'},
    {value: 'History', label: 'History'},
    {value: 'Horror', label: 'Horror'},
    {value: 'Mardock Scramble Production Committee', label: 'Mardock Scramble Production Committee'},
    {value: 'Music', label: 'Music'},
    {value: 'Mystery', label: 'Mystery'},
    {value: 'Romance', label: 'Romance'},
    {value: 'Science Fiction', label: 'Science Fiction'},
    {value: 'Sentai Filmworks', label: 'Sentai Filmworks'},
    {value: 'TV Movie', label: 'TV Movie'},
    {value: 'Thriller', label: 'Thriller'},
    {value: 'War', label: 'War'},
    {value: 'Western', label: 'Western'},
    notKnow,
    ];
    
const statusOptions=[
    {value: 'Canceled', label: 'Canceled'},
    {value: 'In Production', label: 'In Production'},
    {value: 'Planned', label: 'Planned'},
    {value: 'Post Production', label: 'Post Production'},
    {value: 'Released', label: 'Released'},
    {value: 'Rumored', label: 'Rumored'},
    notKnow,
    ];
    
const original_languageOptions=[
    {value: 'ab', label: 'ab'},
    {value: 'af', label: 'af'},
    {value: 'am', label: 'am'},
    {value: 'ar', label: 'ar'},
    {value: 'ay', label: 'ay'},
    {value: 'bg', label: 'bg'},
    {value: 'bm', label: 'bm'},
    {value: 'bn', label: 'bn'},
    {value: 'bo', label: 'bo'},
    {value: 'bs', label: 'bs'},
    {value: 'ca', label: 'ca'},
    {value: 'cn', label: 'cn'},
    {value: 'cs', label: 'cs'},
    {value: 'cy', label: 'cy'},
    {value: 'da', label: 'da'},
    {value: 'de', label: 'de'},
    {value: 'el', label: 'el'},
    {value: 'en', label: 'en'},
    {value: 'eo', label: 'eo'},
    {value: 'es', label: 'es'},
    {value: 'et', label: 'et'},
    {value: 'eu', label: 'eu'},
    {value: 'fa', label: 'fa'},
    {value: 'fi', label: 'fi'},
    {value: 'fr', label: 'fr'},
    {value: 'fy', label: 'fy'},
    {value: 'gl', label: 'gl'},
    {value: 'he', label: 'he'},
    {value: 'hi', label: 'hi'},
    {value: 'hr', label: 'hr'},
    {value: 'hu', label: 'hu'},
    {value: 'hy', label: 'hy'},
    {value: 'id', label: 'id'},
    {value: 'is', label: 'is'},
    {value: 'it', label: 'it'},
    {value: 'iu', label: 'iu'},
    {value: 'ja', label: 'ja'},
    {value: 'jv', label: 'jv'},
    {value: 'ka', label: 'ka'},
    {value: 'kk', label: 'kk'},
    {value: 'kn', label: 'kn'},
    {value: 'ko', label: 'ko'},
    {value: 'ku', label: 'ku'},
    {value: 'ky', label: 'ky'},
    {value: 'la', label: 'la'},
    {value: 'lb', label: 'lb'},
    {value: 'lo', label: 'lo'},
    {value: 'lt', label: 'lt'},
    {value: 'lv', label: 'lv'},
    {value: 'mk', label: 'mk'},
    {value: 'ml', label: 'ml'},
    {value: 'mn', label: 'mn'},
    {value: 'mr', label: 'mr'},
    {value: 'ms', label: 'ms'},
    {value: 'mt', label: 'mt'},
    {value: 'nb', label: 'nb'},
    {value: 'ne', label: 'ne'},
    {value: 'nl', label: 'nl'},
    {value: 'no', label: 'no'},
    {value: 'pa', label: 'pa'},
    {value: 'pl', label: 'pl'},
    {value: 'ps', label: 'ps'},
    {value: 'pt', label: 'pt'},
    {value: 'qu', label: 'qu'},
    {value: 'ro', label: 'ro'},
    {value: 'ru', label: 'ru'},
    {value: 'rw', label: 'rw'},
    {value: 'sh', label: 'sh'},
    {value: 'si', label: 'si'},
    {value: 'sk', label: 'sk'},
    {value: 'sl', label: 'sl'},
    {value: 'sm', label: 'sm'},
    {value: 'sq', label: 'sq'},
    {value: 'sr', label: 'sr'},
    {value: 'sv', label: 'sv'},
    {value: 'ta', label: 'ta'},
    {value: 'te', label: 'te'},
    {value: 'tg', label: 'tg'},
    {value: 'th', label: 'th'},
    {value: 'tl', label: 'tl'},
    {value: 'tr', label: 'tr'},
    {value: 'uk', label: 'uk'},
    {value: 'ur', label: 'ur'},
    {value: 'uz', label: 'uz'},
    {value: 'vi', label: 'vi'},
    {value: 'wo', label: 'wo'},
    {value: 'xx', label: 'xx'},
    {value: 'zh', label: 'zh'},
    {value: 'zu', label: 'zu'}, 
    notKnow,
    ];
    
const spoken_languagesOptions=[
    {value: 'ab', label: 'ab'},
    {value: 'af', label: 'af'},
    {value: 'am', label: 'am'},
    {value: 'ar', label: 'ar'},
    {value: 'as', label: 'as'},
    {value: 'ay', label: 'ay'},
    {value: 'az', label: 'az'},
    {value: 'be', label: 'be'},
    {value: 'bg', label: 'bg'},
    {value: 'bi', label: 'bi'},
    {value: 'bm', label: 'bm'},
    {value: 'bn', label: 'bn'},
    {value: 'bo', label: 'bo'},
    {value: 'br', label: 'br'},
    {value: 'bs', label: 'bs'},
    {value: 'ca', label: 'ca'},
    {value: 'ce', label: 'ce'},
    {value: 'cn', label: 'cn'},
    {value: 'co', label: 'co'},
    {value: 'cr', label: 'cr'},
    {value: 'cs', label: 'cs'},
    {value: 'cy', label: 'cy'},
    {value: 'da', label: 'da'},
    {value: 'de', label: 'de'},
    {value: 'dz', label: 'dz'},
    {value: 'el', label: 'el'},
    {value: 'en', label: 'en'},
    {value: 'eo', label: 'eo'},
    {value: 'es', label: 'es'},
    {value: 'et', label: 'et'},
    {value: 'eu', label: 'eu'},
    {value: 'fa', label: 'fa'},
    {value: 'ff', label: 'ff'},
    {value: 'fi', label: 'fi'},
    {value: 'fo', label: 'fo'},
    {value: 'fr', label: 'fr'},
    {value: 'fy', label: 'fy'},
    {value: 'ga', label: 'ga'},
    {value: 'gd', label: 'gd'},
    {value: 'gl', label: 'gl'},
    {value: 'gn', label: 'gn'},
    {value: 'gu', label: 'gu'},
    {value: 'ha', label: 'ha'},
    {value: 'he', label: 'he'},
    {value: 'hi', label: 'hi'},
    {value: 'hr', label: 'hr'},
    {value: 'ht', label: 'ht'},
    {value: 'hu', label: 'hu'},
    {value: 'hy', label: 'hy'},
    {value: 'id', label: 'id'},
    {value: 'ig', label: 'ig'},
    {value: 'is', label: 'is'},
    {value: 'it', label: 'it'},
    {value: 'iu', label: 'iu'},
    {value: 'ja', label: 'ja'},
    {value: 'jv', label: 'jv'},
    {value: 'ka', label: 'ka'},
    {value: 'ki', label: 'ki'},
    {value: 'kk', label: 'kk'},
    {value: 'km', label: 'km'},
    {value: 'kn', label: 'kn'},
    {value: 'ko', label: 'ko'},
    {value: 'ku', label: 'ku'},
    {value: 'kw', label: 'kw'},
    {value: 'ky', label: 'ky'},
    {value: 'la', label: 'la'},
    {value: 'lb', label: 'lb'},
    {value: 'ln', label: 'ln'},
    {value: 'lo', label: 'lo'},
    {value: 'lt', label: 'lt'},
    {value: 'lv', label: 'lv'},
    {value: 'mh', label: 'mh'},
    {value: 'mi', label: 'mi'},
    {value: 'mk', label: 'mk'},
    {value: 'ml', label: 'ml'},
    {value: 'mn', label: 'mn'},
    {value: 'mr', label: 'mr'},
    {value: 'ms', label: 'ms'},
    {value: 'mt', label: 'mt'},
    {value: 'my', label: 'my'},
    {value: 'nb', label: 'nb'},
    {value: 'ne', label: 'ne'},
    {value: 'nl', label: 'nl'},
    {value: 'no', label: 'no'},
    {value: 'nv', label: 'nv'},
    {value: 'ny', label: 'ny'},
    {value: 'oc', label: 'oc'},
    {value: 'pa', label: 'pa'},
    {value: 'pl', label: 'pl'},
    {value: 'ps', label: 'ps'},
    {value: 'pt', label: 'pt'},
    {value: 'qu', label: 'qu'},
    {value: 'ro', label: 'ro'},
    {value: 'ru', label: 'ru'},
    {value: 'rw', label: 'rw'},
    {value: 'sa', label: 'sa'},
    {value: 'sc', label: 'sc'},
    {value: 'se', label: 'se'},
    {value: 'sg', label: 'sg'},
    {value: 'sh', label: 'sh'},
    {value: 'si', label: 'si'},
    {value: 'sk', label: 'sk'},
    {value: 'sl', label: 'sl'},
    {value: 'sm', label: 'sm'},
    {value: 'sn', label: 'sn'},
    {value: 'so', label: 'so'},
    {value: 'sq', label: 'sq'},
    {value: 'sr', label: 'sr'},
    {value: 'st', label: 'st'},
    {value: 'sv', label: 'sv'},
    {value: 'sw', label: 'sw'},
    {value: 'ta', label: 'ta'},
    {value: 'te', label: 'te'},
    {value: 'tg', label: 'tg'},
    {value: 'th', label: 'th'},
    {value: 'tk', label: 'tk'},
    {value: 'tl', label: 'tl'},
    {value: 'tn', label: 'tn'},
    {value: 'to', label: 'to'},
    {value: 'tr', label: 'tr'},
    {value: 'tt', label: 'tt'},
    {value: 'ty', label: 'ty'},
    {value: 'ug', label: 'ug'},
    {value: 'uk', label: 'uk'},
    {value: 'ur', label: 'ur'},
    {value: 'uz', label: 'uz'},
    {value: 'vi', label: 'vi'},
    {value: 'wo', label: 'wo'},
    {value: 'xh', label: 'xh'},
    {value: 'xx', label: 'xx'},
    {value: 'yi', label: 'yi'},
    {value: 'zh', label: 'zh'},
    {value: 'zu', label: 'zu'}, 
    notKnow,  
    ];
    
const production_countriesOptions=[

    {value: 'Afghanistan', label: 'Afghanistan'},
    {value: 'Albania', label: 'Albania'},
    {value: 'Algeria', label: 'Algeria'},
    {value: 'Angola', label: 'Angola'},
    {value: 'Antarctica', label: 'Antarctica'},
    {value: 'Argentina', label: 'Argentina'},
    {value: 'Armenia', label: 'Armenia'},
    {value: 'Aruba', label: 'Aruba'},
    {value: 'Australia', label: 'Australia'},
    {value: 'Austria', label: 'Austria'},
    {value: 'Azerbaijan', label: 'Azerbaijan'},
    {value: 'Bahamas', label: 'Bahamas'},
    {value: 'Bangladesh', label: 'Bangladesh'},
    {value: 'Barbados', label: 'Barbados'},
    {value: 'Belarus', label: 'Belarus'},
    {value: 'Belgium', label: 'Belgium'},
    {value: 'Bermuda', label: 'Bermuda'},
    {value: 'Bhutan', label: 'Bhutan'},
    {value: 'Bolivia', label: 'Bolivia'},
    {value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina'},
    {value: 'Botswana', label: 'Botswana'},
    {value: 'Brazil', label: 'Brazil'},
    {value: 'Brunei Darussalam', label: 'Brunei Darussalam'},
    {value: 'Bulgaria', label: 'Bulgaria'},
    {value: 'Burkina Faso', label: 'Burkina Faso'},
    {value: 'Cambodia', label: 'Cambodia'},
    {value: 'Cameroon', label: 'Cameroon'},
    {value: 'Canada', label: 'Canada'},
    {value: 'Cayman Islands', label: 'Cayman Islands'},
    {value: 'Chad', label: 'Chad'},
    {value: 'Chile', label: 'Chile'},
    {value: 'China', label: 'China'},
    {value: 'Colombia', label: 'Colombia'},
    {value: 'Congo', label: 'Congo'},
    {value: 'Costa Rica', label: 'Costa Rica'},
    {value: "Cote D'Ivoire", label: "Cote D'Ivoire"},
    {value: 'Croatia', label: 'Croatia'},
    {value: 'Cuba', label: 'Cuba'},
    {value: 'Cyprus', label: 'Cyprus'},
    {value: 'Czech Republic', label: 'Czech Republic'},
    {value: 'Czechoslovakia', label: 'Czechoslovakia'},
    {value: 'Denmark', label: 'Denmark'},
    {value: 'Dominican Republic', label: 'Dominican Republic'},
    {value: 'East Germany', label: 'East Germany'},
    {value: 'Ecuador', label: 'Ecuador'},
    {value: 'Egypt', label: 'Egypt'},
    {value: 'El Salvador', label: 'El Salvador'},
    {value: 'Estonia', label: 'Estonia'},
    {value: 'Ethiopia', label: 'Ethiopia'},
    {value: 'Finland', label: 'Finland'},
    {value: 'France', label: 'France'},
    {value: 'French Polynesia', label: 'French Polynesia'},
    {value: 'French Southern Territories', label: 'French Southern Territories'},
    {value: 'Georgia', label: 'Georgia'},
    {value: 'Germany', label: 'Germany'},
    {value: 'Ghana', label: 'Ghana'},
    {value: 'Gibraltar', label: 'Gibraltar'},
    {value: 'Greece', label: 'Greece'},
    {value: 'Guatemala', label: 'Guatemala'},
    {value: 'Guinea', label: 'Guinea'},
    {value: 'Honduras', label: 'Honduras'},
    {value: 'Hong Kong', label: 'Hong Kong'},
    {value: 'Hungary', label: 'Hungary'},
    {value: 'Iceland', label: 'Iceland'},
    {value: 'India', label: 'India'},
    {value: 'Indonesia', label: 'Indonesia'},
    {value: 'Iran', label: 'Iran'},
    {value: 'Iraq', label: 'Iraq'},
    {value: 'Ireland', label: 'Ireland'},
    {value: 'Israel', label: 'Israel'},
    {value: 'Italy', label: 'Italy'},
    {value: 'Jamaica', label: 'Jamaica'},
    {value: 'Japan', label: 'Japan'},
    {value: 'Jordan', label: 'Jordan'},
    {value: 'Kazakhstan', label: 'Kazakhstan'},
    {value: 'Kenya', label: 'Kenya'},
    {value: 'Kuwait', label: 'Kuwait'},
    {value: 'Kyrgyz Republic', label: 'Kyrgyz Republic'},
    {value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic"},
    {value: 'Latvia', label: 'Latvia'},
    {value: 'Lebanon', label: 'Lebanon'},
    {value: 'Liberia', label: 'Liberia'},
    {value: 'Libyan Arab Jamahiriya', label: 'Libyan Arab Jamahiriya'},
    {value: 'Liechtenstein', label: 'Liechtenstein'},
    {value: 'Lithuania', label: 'Lithuania'},
    {value: 'Luxembourg', label: 'Luxembourg'},
    {value: 'Macao', label: 'Macao'},
    {value: 'Macedonia', label: 'Macedonia'},
    {value: 'Madagascar', label: 'Madagascar'},
    {value: 'Malaysia', label: 'Malaysia'},
    {value: 'Mali', label: 'Mali'},
    {value: 'Malta', label: 'Malta'},
    {value: 'Martinique', label: 'Martinique'},
    {value: 'Mauritania', label: 'Mauritania'},
    {value: 'Mexico', label: 'Mexico'},
    {value: 'Moldova', label: 'Moldova'},
    {value: 'Monaco', label: 'Monaco'},
    {value: 'Mongolia', label: 'Mongolia'},
    {value: 'Montenegro', label: 'Montenegro'},
    {value: 'Morocco', label: 'Morocco'},
    {value: 'Myanmar', label: 'Myanmar'},
    {value: 'Namibia', label: 'Namibia'},
    {value: 'Nepal', label: 'Nepal'},
    {value: 'Netherlands', label: 'Netherlands'},
    {value: 'Netherlands Antilles', label: 'Netherlands Antilles'},
    {value: 'New Zealand', label: 'New Zealand'},
    {value: 'Nicaragua', label: 'Nicaragua'},
    {value: 'Nigeria', label: 'Nigeria'},
    {value: 'North Korea', label: 'North Korea'},
    {value: 'Norway', label: 'Norway'},
    {value: 'Pakistan', label: 'Pakistan'},
    {value: 'Palestinian Territory', label: 'Palestinian Territory'},
    {value: 'Panama', label: 'Panama'},
    {value: 'Papua New Guinea', label: 'Papua New Guinea'},
    {value: 'Paraguay', label: 'Paraguay'},
    {value: 'Peru', label: 'Peru'},
    {value: 'Philippines', label: 'Philippines'},
    {value: 'Poland', label: 'Poland'},
    {value: 'Portugal', label: 'Portugal'},
    {value: 'Puerto Rico', label: 'Puerto Rico'},
    {value: 'Qatar', label: 'Qatar'},
    {value: 'Romania', label: 'Romania'},
    {value: 'Russia', label: 'Russia'},
    {value: 'Rwanda', label: 'Rwanda'},
    {value: 'Samoa', label: 'Samoa'},
    {value: 'Saudi Arabia', label: 'Saudi Arabia'},
    {value: 'Senegal', label: 'Senegal'},
    {value: 'Serbia', label: 'Serbia'},
    {value: 'Serbia and Montenegro', label: 'Serbia and Montenegro'},
    {value: 'Singapore', label: 'Singapore'},
    {value: 'Slovakia', label: 'Slovakia'},
    {value: 'Slovenia', label: 'Slovenia'},
    {value: 'Somalia', label: 'Somalia'},
    {value: 'South Africa', label: 'South Africa'},
    {value: 'South Korea', label: 'South Korea'},
    {value: 'Soviet Union', label: 'Soviet Union'},
    {value: 'Spain', label: 'Spain'},
    {value: 'Sri Lanka', label: 'Sri Lanka'},
    {value: 'Sweden', label: 'Sweden'},
    {value: 'Switzerland', label: 'Switzerland'},
    {value: 'Syrian Arab Republic', label: 'Syrian Arab Republic'},
    {value: 'Taiwan', label: 'Taiwan'},
    {value: 'Tajikistan', label: 'Tajikistan'},
    {value: 'Tanzania', label: 'Tanzania'},
    {value: 'Thailand', label: 'Thailand'},
    {value: 'Trinidad and Tobago', label: 'Trinidad and Tobago'},
    {value: 'Tunisia', label: 'Tunisia'},
    {value: 'Turkey', label: 'Turkey'},
    {value: 'Uganda', label: 'Uganda'},
    {value: 'Ukraine', label: 'Ukraine'},
    {value: 'United Arab Emirates', label: 'United Arab Emirates'},
    {value: 'United Kingdom', label: 'United Kingdom'},
    {value: 'United States Minor Outlying Islands', label: 'United States Minor Outlying Islands'},
    {value: 'United States of America', label: 'United States of America'},
    {value: 'Uruguay', label: 'Uruguay'},
    {value: 'Uzbekistan', label: 'Uzbekistan'},
    {value: 'Venezuela', label: 'Venezuela'},
    {value: 'Vietnam', label: 'Vietnam'},
    {value: 'Yugoslavia', label: 'Yugoslavia'},
    {value: 'Zimbabwe', label: 'Zimbabwe'},
    notKnow,     
    ];
    
const adultOptions=[
    {value: 'True', label: 'True'},
    {value: 'False', label: 'False'},  
    notKnow,    
    ];
    
const videoOptions=[
    {value: 'True', label: 'True'},
    {value: 'False', label: 'False'},  
    notKnow,    
    ];
    
const allOptions={
    'genres': genresOptions,
    'status': statusOptions,
    'original_language': original_languageOptions,
    'spoken_languages': spoken_languagesOptions,
    'production_countries': production_countriesOptions,
    'adult': adultOptions,
    'video': videoOptions,
    };
    
const questionsContent = [
        "id",
        "imdb_id",
        "belongs_to_collection",
        "budget (For example, greater than $5,000,000)",
        "genres",
        "homepage",
        "original_language",
        "overview",
        "popularity",
        "poster_path",
        "production_companies",
        "production_countries",
        "release_date (For example, 2015-2016)",
        "revenue (For example, $1,000,000 - $2,000,000)",
        "runtime (For example, 100 minutes - 120 minutes)",
        "spoken_languages",
        "status",
        "tagline",
        "video",
        "vote_average",
        "vote_count",
        "adult (Is this movie R rated?)"
];

const questions = [
    "id",
    "imdb_id",
    "belongs_to_collection",
    "budget",
    "genres",
    "homepage",
    "original_language",
    "overview",
    "popularity",
    "poster_path",
    "production_companies",
    "production_countries",
    "release_date",
    "revenue",
    "runtime",
    "spoken_languages",
    "status",
    "tagline",
    "video",
    "vote_average",
    "vote_count",
    "adult"
];

class Question extends React.Component {

    constructor(props){
        super(props);
        this.state={
            startTime: new Date().getTime(),
        };
    }

    onClickNext(){
        const q=questions[this.props.questionId];
        let answer;
        if (q=='genres' || q=='status' || q=='original_language' || q=='spoken_languages'
        || q=='production_countries' || q=='adult' || q=='video'){
            answer=document.getElementsByName(q)[0].value;
        }
        else{
            answer=document.getElementById(q).value;
        }

        const endTime=new Date().getTime();
        const duration=endTime-this.state.startTime;
        console.log("response time for answering ", q , " is ", duration/1000," seconds");
        this.props.handleNext(q,answer,duration);
    }

    renderQuestion(){
        const q=questions[this.props.questionId];
        const content=questionsContent[this.props.questionId];

        if (q=='genres' || q=='status' || q=='original_language' || q=='spoken_languages'
        || q=='production_countries' || q=='adult' || q=='video'){
          const options=allOptions[q];
          return (
            <h2 key={this.props.questionId} className='question'>
              {content}
              <Select name={q} options={options} />
            </h2>
          );
        }
        else {
          return (
            <h2 key={this.props.questionId} className='question'>
                {content} 
                <br></br>
                <input autoFocus id={q} type="text" />
            </h2>
          );
        }
      }
    

    render () {
        return (
            <CSSTransition
            className="container"
            component="div"
            timeout={200}
            // transitionName="fade"
            // transitionEnterTimeout={800}
            // transitionLeaveTimeout={500}
            // transitionAppear
            // transitionAppearTimeout={500}
            >

            <div key={this.props.questionId}>
                <QuestionCount counter={this.props.questionId+1}/>
                {this.renderQuestion()}
                <Button size='lg' variant="secondary" onClick={()=>this.onClickNext()} block>Next</Button>
            </div>
            </CSSTransition>
        );
        
    }
}



class QuestionCount extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="questionCount">
              Question <span>{this.props.counter}</span> of <span>{questions.length}</span>
            </div>
          );  
    }
}








export default Question;