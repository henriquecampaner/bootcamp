import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

class EnrollmentController {
  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment does not exists' });
    }

    const student = await Student.findByPk(enrollment.student_id);
    const plan = await Plan.findByPk(enrollment.plan_id);

    return res.json({ enrollment, plan, student });
  }

  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    // Check if this student already has an enrollment
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(401)
        .json({ error: 'A enrollment with this student already exists' });
    }

    // Calculate the full price and end date
    const plan = await Plan.findByPk(plan_id);

    const price = plan.duration * plan.price;
    const end_date = addMonths(parseISO(start_date), plan.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const { name: studentName, email: studentEmail } = await Student.findByPk(
      req.body.student_id
    );

    await Queue.add(WelcomeMail.key, {
      studentName,
      studentEmail,
      start_date,
      end_date,
      planTitle: plan.title,
      price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    if (plan) {
      // Check if admin can edit student_id
      if (student_id !== enrollment.student_id) {
        const studentEnrollmentExists = await Enrollment.findOne({
          where: { student_id },
        });

        if (studentEnrollmentExists) {
          return res
            .status(401)
            .json({ error: 'A enrollment with this student already exists' });
        }
      }

      let { end_date, price } = enrollment;

      // Calculate the full price and end date
      if (plan_id !== enrollment.plan_id) {
        price = plan.duration * plan.price;
        end_date = addMonths(parseISO(start_date), plan.duration);
      }

      // Calculate the new end date
      if (start_date !== enrollment.start_date) {
        end_date = addMonths(parseISO(start_date), plan.duration);
      }

      await enrollment.update({
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      });
      await enrollment.save();

      return res.json(enrollment);
    }
    return res
      .status(401)
      .json({ error: 'Student does not have an enrollment' });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({ where: { id } });

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    await enrollment.destroy();

    return res.json({ ok: 'enrollment deleted' });
  }
}

export default new EnrollmentController();
