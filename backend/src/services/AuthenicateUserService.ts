import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenicateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const sessionsRepository = getRepository(User);
    const user = await sessionsRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('User or password is invalid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error('User or password is invalid');
    }

    const token = sign({}, 'dcdf784fa11cc0de0c25cf3e56209058', {
      subject: user.id,
      expiresIn: '1d',
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default AuthenicateUserService;
