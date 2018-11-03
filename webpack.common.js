/**
 * Created by zhaoyongsheng on 17/11/16.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux'],
        app: './src/manage/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/manage/index.html'
        }),
        new ExtractTextPlugin('styles.[hash].css'),
    ],
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, 'server/manage')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'url-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {   test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /react/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // }
 };