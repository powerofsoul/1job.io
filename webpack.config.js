const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: "./src/app.tsx",
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', ".css"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  output: {
    path: path.join(__dirname, "public", "out"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  mode: "development"
};