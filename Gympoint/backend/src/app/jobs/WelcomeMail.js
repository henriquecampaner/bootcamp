import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const {
      studentName,
      studentEmail,
      start_date,
      end_date,
      planTitle,
      price,
    } = data;

    // eslint-disable-next-line no-console
    console.log(data);

    await Mail.sendMail({
      to: studentEmail,
      subject: 'Registration Done',
      template: 'welcome',
      context: {
        student: studentName,
        title: planTitle,
        start: format(parseISO(start_date), "dd 'of' MMMM' de 'yyyy", {}),
        end: format(parseISO(end_date), "dd 'of' MMMM' de 'yyyy", {}),
        price: price.toFixed(2),
      },
    });
  }
}

export default new WelcomeMail();
