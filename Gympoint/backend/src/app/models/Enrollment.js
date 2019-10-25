  import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {foreignKey: 'student_id', as: 'student'});

    this.belongsTo(models.Plan, { oreignKey: 'plan_id', as: 'plan' });

    this.belongsTo(models.Plan, { foreignKey: 'price_plan', as: 'price' });
  }


}

export default Enrollment;