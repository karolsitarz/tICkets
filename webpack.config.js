const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  return {
    name: 'client',
    target: 'web',
    entry: './src/index',
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                envName: production ? 'production' : 'development'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      !production
        ? undefined
        : new SWPrecacheWebpackPlugin({
            cacheId: 'tICkets',
            minify: true
          })
    ].filter(Boolean),
    mode: production ? 'production' : 'development',
    devtool: production ? 'none' : 'cheap-module-eval-source-map',
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      open: true
    }
  };
};
