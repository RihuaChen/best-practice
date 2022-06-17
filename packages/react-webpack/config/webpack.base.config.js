const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env !== 'production';

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['postcss-preset-env'],
    },
  },
};

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  target: 'web',
  cache: {
    type: 'filesystem',
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: ['node_modules', path.resolve(__dirname, '../src')],
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(s[ac])ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
                auto: /\.module\.(s[ac])ss$/i,
                getLocalIdent(loaderContext, localIdentName, localName, options) {
                  if (loaderContext.resourcePath.includes('theme')) {
                    return localName;
                  }
                },
              },
            },
          },
          postcssLoader,
          'sass-loader',
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                    refresh: isDevelopment,
                    development: isDevelopment,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 默认是8kb
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new WebpackBar(),
    isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
  ].filter(Boolean),
};
