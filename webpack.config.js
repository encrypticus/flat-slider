/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    'index': './src/js/index.js',
  },

  output: { // точка выхода
    filename: '[name].js', // имя выходного js-файла
    path: path.resolve(__dirname, 'dist'), // директория, в которой будет лежать выходной файл
  },

  devtool: 'source-map',

  watch: true,

  resolve: { // обязательно для написания тесов на ts
    extensions: ['.js', '.ts', '.tsx']
  },

  module: { // модули, обрабатывающие файлы с указанным расширением
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node-modules/
      },

      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        exclude: /img/,
        use: [
          {
            loader: 'file-loader',
            options: {name: './fonts/[name].[ext]'}
          }
        ]
      },

      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {name: './img/[name][hash:7].[ext]'}
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          }
        ]
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'video:poster', 'video:src']
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({filename: 'styles.css', chunkFilename: '[id].css'}),
    new CleanWebpackPlugin('dist', {root: process.cwd(), exclude: ['.git']}),
    new HtmlWebpackPlugin({filename: 'index.html', template: 'src/pages/index.pug', inject: false}),
    new CopyWebpackPlugin([{from: 'src/favicons', to: 'favicons'}]),
    new StyleLintPlugin({
      context: './',
      fix: true,
      files: ['**/*.scss', '**/*.css'],
      quiet: false,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
