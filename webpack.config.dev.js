const prodConfig = require("./webpack.config");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    ...prodConfig,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...prodConfig.plugins
    ],
    devtool: "source-map",
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: {
            index: 'index.html'
        },
        index: 'index.html'
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}