const { type } = require('os');
const path = require('path');

module.exports = {
    mode: 'development', 
    entry: './frontend/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/, 
            type: 'javascript/auto',
            use: {
                loader:'babel-loader',
                options:{
                    presets: ['@babel/preset-env'],
                    sourceType: 'unambiguous'
                }
            }
        }]
    },
    devtool: 'source-map'
};
