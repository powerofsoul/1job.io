const prodConfig = require("./webpack.config");
const webpack = require('webpack');

module.exports = {
    ...prodConfig,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}