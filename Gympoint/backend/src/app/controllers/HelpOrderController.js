import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import QuestionAnsweredMail from '../jobs/QuestionAnsweredMain';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const { question } = req.body;

    const { id } = await HelpOrder.create({
      student_id: studentId,
      question,
    });

    return res.json({ id, student_id: studentId, question });
  }

  async index(req, res) {
    const helpOrders = await HelpOrder.findAll();

    return res.json(helpOrders);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.studentId);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const helpOrders = await HelpOrder.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        student_id: req.params.studentId,
      },
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { helpOrderId } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(helpOrderId, {
      attributes: { exclude: ['created_at', 'updated_at'] },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(QuestionAnsweredMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
