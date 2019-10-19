import express from 'express';
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
  }

  routes() {
    this.server.use(routes);
    // metodo para importar as rotas
  }
}
export default new App().server;
