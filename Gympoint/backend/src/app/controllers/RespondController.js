import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import File from '../models/File';

class RespondController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const helpOrders = await HelpOrder.findAll({
      where: { answer_at: null },
      attributes: ['id', 'question'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(helpOrders);
  }
}

export default new RespondController();
