var path = require('path');

var DIST_DIR = path.join(__dirname, '/server/public');
var SRC_DIR = path.join(__dirname, '/client/src');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");




module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
          // ,
          // {
          //   test: /\.css$/,
          //   use: [
          //     isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"
          //   ]
          // }
        }
      ]
    },
    resolve : {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      isProduction && new MiniCssExtractPlugin({
        filename: "assets/css/[name].[contenthash:8].css",
        chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
      })
    ].filter(Boolean),
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      overlay: true
    },
    watch: true,
    watchOptions: {
      poll: 1000
    }
  };
};


//Thanks to SRC
//https://www.toptal.com/react/webpack-react-tutorial-pt-1


//Webpack watch option
//https://webpack.js.org/configuration/watch/

// Error
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/DumpStack.log.tmp'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/hiberfil.sys'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/pagefile.sys'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/swapfile.sys'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/DumpStack.log.tmp'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/hiberfil.sys'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/pagefile.sys'
// Watchpack Error (initial scan): Error: EACCES: permission denied, lstat '/mnt/c/swapfile.sys'
//sudo npm install -g --unsafe-perm=true --allow-root