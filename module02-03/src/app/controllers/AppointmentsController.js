import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import User from '../models/User';
import Appointments from '../models/Appointments';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import CancellationMain from '../jobs/CancellationMail';

class AppointmentsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointments.findAll({
      where: { user_id: req.userId, canceled_at: null },
      // onde esta o usuario
      order: ['date'],
      // ordena por data
      attributes: ['id', 'date', 'past', 'cancelable'],
      // seleciona quais campos aparecerao
      limit: 20,
      // limite da lsitagem
      offset: (page - 1) * 20,
      // conta para saber quantos registros pular de acordo com a pagina
      include: [
        // o que sera incluido no retorno
        {
          model: User,
          // relacionamento com a tabela
          as: 'provider',
          // qual parte do relacionamento
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
              // dados para retornar o avatar
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const CheckIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!CheckIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // Checar se e eles msm marcando appointment

    const ProviderToHimSelf = req.userId;

    if (ProviderToHimSelf === CheckIsProvider.id) {
      return res
        .status(401)
        .json({ error: 'You can not create an appointment for youserlf' });
    }

    // check if the date has passed

    const hourStart = startOfHour(parseISO(date));
    // transforma a data do que req em formato Js

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // check if date is available

    const checkAvailability = await Appointments.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    // Notify appointment provider with mongodb

    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "MMM dd 'at' H:mm'h'");

    await Notification.create({
      content: `New appointment from ${user.name} to ${formattedDate} `,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointments.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment.',
      });
    }

    const dataWithSub = subHours(appointment.date, 2);
    // retira 2h do horario do apontamento

    if (isBefore(dataWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    // Configurando o envio de email (revisar config/mail.. lib/mail)
    Queue.add(CancellationMain.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentsController();
