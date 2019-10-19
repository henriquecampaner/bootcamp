import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
// importa arquivo de configuracao

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // verificar se o usuario existe

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }
    // verifica se a senha bate... importando o checkpassowrd do model

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      // retorna os dados do usuario
      // toke: 1-payload(informacoes adicionais)
      // 2- uma string criptografada (md5online)
      // 3- expiracao
    });
  }
}

export default new SessionController();
