var webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './bundle/bundle.js'
    },

    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: ['node_modules']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' }
        ]
    }
}
