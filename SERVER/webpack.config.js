var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app');
var APP_DIR = path.resolve(__dirname, 'components');

var config = {
	entry: APP_DIR + '/App.jsx',
	output: {
		path: BUILD_DIR,
        filename: 'bundle.js'
	},
	module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //không dịch các file trong node_modules
            }
        ]
    }
};
module.exports = config;