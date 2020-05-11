import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
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

    delete user.password;

    return {
      user,
    };
  }
}

export default AuthenicateUserService;
