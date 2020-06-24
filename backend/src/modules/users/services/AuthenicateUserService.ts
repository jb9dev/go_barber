import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

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
    const { secret, expiresIn } = authConfig.jwt;

    if (!user) {
      throw new AppError('User or password is invalid', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('User or password is invalid', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default AuthenicateUserService;
