const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/app.tsx"),
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
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "STRIPE_PUBLIC_KEY": JSON.stringify(process.env.STRIPE_PUBLIC_KEY)
    })
  ],
  mode: "production"
};