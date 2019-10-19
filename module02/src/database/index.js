import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connections = new Sequelize(databaseConfig);
    // conexao com basededados

    models.map(model => model.init(this.connections));
    // map que rodar os models para instanciaro init
  }
}

export default new Database();
