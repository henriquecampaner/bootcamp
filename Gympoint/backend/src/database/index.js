import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Students from '../app/models/Student';

import Users from '../app/models/Users';

const models = [Students, Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connections = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connections));
  }
}

export default new Database();
