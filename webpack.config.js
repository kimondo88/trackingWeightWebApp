const path = require('path');

module.exports = {
  entry: {
        home: './src/home.js',
        page: './src/page.js',
        chart: './src/chartdata.js'
    },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: ['./dist/']
  }
};