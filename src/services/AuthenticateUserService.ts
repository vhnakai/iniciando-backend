import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserSerivce {
  /**
   * execute
   */
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('incorrect email/password combination.');
    }

    const passwordMateched = await compare(password, user.password);

    if (!passwordMateched) {
      throw new Error('incorrect email/password combination.');
    }

    const token = sign({}, 'cb4f0d246dc8156e6c20d755123c4cd8', {
      subject: user.id,
      expiresIn: '1d',
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserSerivce;
