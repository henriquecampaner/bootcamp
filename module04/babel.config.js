module.exports = {
    presets: [
        "@babel/preset-env",
        // faz o navegador entender o codigo es6+
        "@babel/preset-react"
        // fazer o navegador entender o react
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
        // para ler as propriedades das class
    ]
};