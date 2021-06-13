const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './ui/src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                use: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.wasm$/,
                use: 'file-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './ui/public/index.html'
        })
    ],
    devtool: 'source-map',
    mode: 'development'
}

module.exports = config;