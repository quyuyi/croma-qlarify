import React from 'react';
import ReactTable from 'react-table';
import NumberFormat from 'react-number-format';

const data = [{"id": 1, "feature": "id", "entropy": 10.0, "rank": 1}, {"id": 2, "feature": "imdb_id", "entropy": 9.99903526098446, "rank": 2}, {"id": 3, "feature": "poster_path", "entropy": 9.951659214767707, "rank": 3}, {"id": 4, "feature": "cast", "entropy": 9.596099443558456, "rank": 4}, {"id": 5, "feature": "characters", "entropy": 9.400122839128937, "rank": 5}, {"id": 6, "feature": "director", "entropy": 8.538714850522197, "rank": 6}, {"id": 7, "feature": "production_companies", "entropy": 6.899996563537141, "rank": 7}, {"id": 8, "feature": "keywords", "entropy": 6.698807961746999, "rank": 8}, {"id": 9, "feature": "genres", "entropy": 5.026001681583249, "rank": 9}, {"id": 10, "feature": "tagline", "entropy": 4.762238250154396, "rank": 10}, {"id": 11, "feature": "release_date", "entropy": 3.765116874947182, "rank": 11}, {"id": 12, "feature": "screenplay", "entropy": 3.392864359336299, "rank": 12}, {"id": 13, "feature": "production_countries", "entropy": 3.035980332012684, "rank": 13}, {"id": 14, "feature": "spoken_languages", "entropy": 2.7385092544924867, "rank": 14}, {"id": 15, "feature": "homepage", "entropy": 1.857562757056457, "rank": 15}, {"id": 16, "feature": "original_language", "entropy": 1.3787059670243418, "rank": 16}, {"id": 17, "feature": "runtime", "entropy": 1.2190365403337091, "rank": 17}, {"id": 18, "feature": "vote_average", "entropy": 1.1027614918447388, "rank": 18}, {"id": 19, "feature": "belongs_to_collection", "entropy": 0.95743488041117, "rank": 19}, {"id": 20, "feature": "popularity", "entropy": 0.24910960271218396, "rank": 20}, {"id": 21, "feature": "budget", "entropy": 0.13132676109011207, "rank": 21}, {"id": 22, "feature": "revenue", "entropy": 0.0852187485828623, "rank": 22}, {"id": 23, "feature": "vote_count", "entropy": 0.06585973614678141, "rank": 23}, {"id": 24, "feature": "status", "entropy": 0.06206913313384368, "rank": 24}, {"id": 25, "feature": "video", "entropy": 0.012910327014149446, "rank": 25}, {"id": 26, "feature": "adult", "entropy": -0.0, "rank": 26}];

class Entropy extends React.Component {

    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
        };
    }

    render() {
        // const data=this.props.rules;
        const loading=this.props.loading;
        
        const columns=[
            {
                Header: 'Rank',
                accessor: 'rank',
            },
            {
                Header: 'Question',
                accessor: 'feature',
            },
            {
                Header: 'Score',
                accessor: 'entropy',
                Cell: row => (
                    <NumberFormat value={row.value} displayType={'text'} decimalScale={2} />
                ),
            }
        ];

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />   
            </div>
        );
    }

}

export default Entropy;



