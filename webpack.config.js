const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
            }
        ]
    }
};