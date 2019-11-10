module.exports = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/i,
            //     exclude: /node_modules/,
            //     use: ['url-loader?limit=8192','file-loader']
            //   } 
        ]
    },
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js'
    }
};
