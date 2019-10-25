import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
    async store(req, res){
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
            .json({ error: 'A enrollment with this student already exists' }); }

        // Calculate the full price and end date
        const plan = await Plan.findByPk(plan_id);

        const price_plan = plan.duration * plan.price;
        const end_date = addMonths(parseISO(start_date), plan.duration);

        const enrollment = await Enrollment.create({
        student_id,
        plan_id,
        start_date,
        end_date,
        price_plan,
        });

        return res.json(enrollment);
    }
}
    


export default new EnrollmentController();