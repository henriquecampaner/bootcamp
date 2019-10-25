import Sequelize from 'sequelize';

import Students from '../app/models/Student';
import Users from '../app/models/Users';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';

import databaseConfig from '../config/database';

const models = [Students, Users, Plan, Enrollment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
