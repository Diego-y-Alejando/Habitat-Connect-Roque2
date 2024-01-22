const path = require('path');

module.exports = {
  entry: {
    calendar: './src/calendar.js',
    calendars: './src/calendars.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/js'), 
    filename: '[name].js', // Utiliza el marcador [name] para generar nombres de archivo dinámicos
    publicPath: 'http://localhost:8080/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usa babel-loader para manejar archivos JS
        }
      }
    ]  
  }
};
