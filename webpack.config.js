var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    addDiseaseForm: "./src/controller/addDiseaseForm.js",
    browse: "./src/controller/browse.js",
    diseaseDetails: "./src/controller/diseaseDetails.js",
    editDetails: "./src/controller/editDetails.js",
    header: "./src/controller/header.js",
    search: "./src/controller/search.js",
  },
  output: {
    path: path.resolve(__dirname, "js/controller"),
    filename: "[name].js",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
};
