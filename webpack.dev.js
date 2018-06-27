/**
 * Created by zhaoyongsheng on 17/11/16.
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './server/index',
        port: 8081,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development'
});