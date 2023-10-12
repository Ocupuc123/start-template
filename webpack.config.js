import path from 'node:path';
import url from 'node:url';
import webpack from 'webpack';

export default {
  // eslint-disable-next-line no-undef
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    scripts: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './src/js/entry.js')
  },
  output: {
    path: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './build/js'),
    filename: '[name].min.js',
    chunkFilename: '[name].min.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
  // eslint-disable-next-line no-undef
  optimization: process.env.NODE_ENV === 'development' ? {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  } : {},
  performance: {
    hints: false
  }
};
