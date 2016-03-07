var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/Bus.js',
    output: {
        filename: './index.js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader'
            }
        ]
    }
}
