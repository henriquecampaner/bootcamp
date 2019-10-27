import Sequelize, { Model } from 'sequelize';

import { differenceInCalendarDays } from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        birthday: Sequelize.DATE,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.calcAge();
          },
        },
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  calcAge() {
    const age = Math.floor(
      differenceInCalendarDays(new Date(), this.birthday) / 365.25
    );
    return `${age} years`;
  }
}

export default Student;
