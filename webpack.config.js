const path = require('path');

module.exports = {
  entry: './src/calendar.js', // Ruta de tu archivo principal
  output: {
    path: path.resolve(__dirname, 'public/js'), 
    filename: 'bundle.js', // Archivo de salida
    publicPath: 'http://localhost:8080/'
  },
  devtool: 'source-map',
  module:{
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