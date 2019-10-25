import * as Yup from 'yup';
import Student from '../models/Student';
import { isAfter, parseISO } from 'date-fns';

class StudentController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const students = await Student.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
    });

    return res.json(students);
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
      birthday: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, birth } = req.body;

    if (isAfter(parseISO(birth), new Date())) {
      return res
        .status(400)
        .json({ error: 'Birth date can not be after current date' });
    }

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
      email: Yup.string().email(),
      birthday: Yup.date(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const studentExists = await Student.findOne({
    //   where: { email: req.body.email },
    // });

    // if (studentExists) {
    //   return res.status(400).json({ error: 'Student already exists.' });
    // }

    try {
      const student = await Student.findByPk(req.params.id);
      const { name, email, birthday, weight, height } = student.update(req.body);

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({ error: 'Update failed.' });
    }
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    await student.destroy(student.id);

    return res.status(200).json({ sucess: 'Deleted with sucess.' });
  }
}

export default new StudentController();
