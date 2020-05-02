const prodConfig = require("./webpack.config");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    ...prodConfig,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: {
            index: 'public/index.html'
        }
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}