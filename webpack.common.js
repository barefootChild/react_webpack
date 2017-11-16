/**
 * Created by zhaoyongsheng on 17/11/16.
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['server/index']),
        new HtmlWebpackPlugin({
            template: './src/index/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, 'server/index')
    },
    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass?sourceMap"
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap'
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
        ]
    }
 };