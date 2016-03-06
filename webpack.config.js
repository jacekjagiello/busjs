var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/Bus.js',
    output: {
        filename: './bundle/bundle.js'
    },

    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ['node_modules']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader'
            }
        ]
    }
}
