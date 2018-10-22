/**
 * Created by zhaoyongsheng on 17/11/16.
 */

const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    plugins: [
        new CleanWebpackPlugin(['server/managePicture']),
    ],
    mode: "production"
});