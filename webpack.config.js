const path = require('path');

module.exports = {
  entry: './src/calendar.js', // Ruta de tu archivo principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // Archivo de salida
  },
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