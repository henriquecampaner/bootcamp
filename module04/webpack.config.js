const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  // entry e o arquivo de entrada/ path sendo utilizado para rodar em todos sistemas
  output: {
    path: path.resolve(__dirname, 'public'),
    // pasta onde o arquivo gerado sera salvo
    filename: 'bundle.js'
    // nome do arquivo que sera utilizado para ter toda compilacao
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    // passa o caminho onde estas o index.html 
  },
  module: {
    rules: [
      // regras do loader
      {
        test: /\.js$/,
        // regex para transpilar arquivos que acabem em .js
        exclude: /node_modules/,
        // nao incluir arquivos que estejam na pasta node_modules
        use: {
          loader: 'babel-loader'
          // aqui vai o loader para realizar a transpilacao
        }
      }, {
        test: /\.css$/,
        // para os arquivos css
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
          // loaders para transpilar os arquivos
        ]
      }, {
        test: /.*\.(gif|png|jpe?g)$/i,
        // regex para imagens
        use: {
          loader: 'file-loader'
          // loader imagens
        }
      }
    ]
  },
};

// dentro do packge.json adicionar: "webpack --mode development" nos scripts
// isso gera o bundle.js