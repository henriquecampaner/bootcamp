import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    // sera chamado assim que instanciado
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    // para poder acessar as imagens no frontend
  }

  routes() {
    this.server.use(routes);
    // metodo para importar as rotas
  }
}
export default new App().server;
