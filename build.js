/** @format */

const babelCore = require("@babel/core");
const path = require("path");
const fs = require("fs");

const source = fs.readFileSync(path.join(__dirname, "/src/index.js"), "utf8");

const code = babelCore.transform(source, {
  babelrc: false,
  presets: ["@babel/preset-env", "@babel/preset-flow"],
  plugins: [
    "@babel/plugin-syntax-object-rest-spread",
    "babel-plugin-inferno",
    "@babel/plugin-syntax-jsx"
  ]
}).code;

const codeMin = babelCore.transform(source, {
  babelrc: false,
  comments: false,
  presets: ["@babel/preset-env", "@babel/preset-flow", "minify"],
  plugins: ["babel-plugin-inferno", "@babel/plugin-syntax-jsx"]
}).code;

fs.writeFileSync(path.join(__dirname, "/lib/index.js"), code, "utf8");
fs.writeFileSync(path.join(__dirname, "/lib/index.min.js"), codeMin, "utf8");
