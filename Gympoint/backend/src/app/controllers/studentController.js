import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import Checkin from '../models/Checkin';
import HelpOrder from '../models/HelpOrder';

class StudentController {
  async index(req, res) {
    const { name } = req.query;

    if (name) {
      const students = await Student.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      return res.status(200).json(students);
    }

    // Listagem Geral - Sem Query
    const students = await Student.findAll();

    return res.status(200).json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { name, email, age, weight, height } = req.body;

    const student = await Student.findByPk(id);

    // if (student.email !== email) {
    //   const studentExists = await Student.findOne({ where: { email } });

    //   if (studentExists) {
    //     return res.status(401).json({ error: 'Email is already in use' });
    //   }
    // }

    await student.update({ name, email, age, weight, height });
    await student.save();

    return res.json(student);
  }

  async delete(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const enrollment = await Enrollment.findOne({ where: { student_id } });
    if (enrollment) {
      await enrollment.destroy();
    }

    const checkin = await Checkin.findOne({ where: { student_id } });
    if (checkin) {
      await checkin.destroy();
    }

    const help = await HelpOrder.findOne({ where: { student_id } });
    if (help) {
      await help.destroy();
    }

    await student.destroy();

    return res.json({ ok: 'user deleted' });
  }
}

export default new StudentController();
