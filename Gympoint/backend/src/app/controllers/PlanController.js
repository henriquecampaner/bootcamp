import * as Yup from 'yup';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class PlanController {
  async show(req, res) {
    const { id } = req.params;

    const { price, title, duration } = await Plan.findByPk(id);

    const total = duration * price;

    return res.json({
      price,
      title,
      duration,
      total,
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'There are details missing or wrong' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan alredy exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'There are details missing or wrong' });
    }

    const plan = await Plan.findByPk(req.params.id);

    // const planExists = req.body.title;

    // if (planExists === plan.title) {
    //   return res.status(400).json({ error: 'Plan alredy exists' });
    // }

    const { title, duration, price } = await plan.update(req.body);

    return res.send({ title, duration, price });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const enrollmentExist = await Enrollment.findOne({
      where: { plan_id: plan.id },
    });

    if (enrollmentExist) {
      return res
        .status(400)
        .json({ error: 'This Plan has a Enrollment associated' });
    }

    await plan.destroy(plan.id);

    return res.status(200).json({ sucess: 'Deleted with sucess.' });
  }
}

export default new PlanController();
