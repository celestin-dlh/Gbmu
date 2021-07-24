const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { SourceMapDevToolPlugin } = require('webpack');

const config = {
    entry: './ui/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: { 
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
        },
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
                test: /\.(wasm|wasm.map)/,
                use: 'file-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './ui/public/index.html'
        }),
    ],
    // devtool: 'source-map',
    mode: 'development'
}

module.exports = config;