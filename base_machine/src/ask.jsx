import React from 'react';
import Select from 'react-select';
import Submit from './submit.jsx';


class Ask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            selectedOption: null,
            startTime: null,
            first: true,
            loading: false,
        };
    }

    componentDidMount() {
    }

    handleChange(e) {
        console.log(e)
        this.setState({ selectedOption : e.value });
      };

    render(){

        const options = [
            { value: 'id', label: 'id' },
            { value: 'imdb_id', label: 'imdb id' },
            // { value: 'title', label: 'title' },
            { value: 'belongs_to_collection', label: 'belongs to collection' },
            { value: 'budget', label: 'budget' },
            { value: 'genres', label: 'genres' },
            { value: 'homepage', label: 'homepage' },
            { value: 'original_language', label: 'original language' },
            // { value: 'original_title', label: 'original title' },
            { value: 'overview', label: 'overview' },
            { value: 'popularity', label: 'popularity' },
            { value: 'poster_path', label: 'poster path' },
            { value: 'production_companies', label: 'production companies' },
            { value: 'production_countries', label: 'production countries' },
            { value: 'release_date', label: 'release date' },
            { value: 'revenue', label: 'revenue' },
            { value: 'runtime', label: 'runtime' },
            { value: 'spoken_languages', label: 'spoken languages' },
            { value: 'status', label: 'status' },
            { value: 'tagline', label: 'tagline' },
            { value: 'video', label: 'video' },
            { value: 'vote_average', label: 'user score' },
            { value: 'vote_count', label: 'vote count' },
            { value: 'adult', label: 'adult' },
            // { value: 'characters', label: 'characters' },
            // { value: 'cast', label: 'cast' },
            // { value: 'director', label: 'director' },
        ]

        return (
            <div>
                <Select
                    onChange={this.handleChange.bind(this)}
                    options={options}
                />

                <Submit
                movieIndex="where to get movie index?"
                result={this.state.selectedOption}
                condition={this.props.condition}
                />

            </div>
        );
    }
}

export default Ask;