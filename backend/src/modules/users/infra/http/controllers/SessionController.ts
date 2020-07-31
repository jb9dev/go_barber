import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenicateUserService from '@modules/users/services/AuthenicateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenicateUserService = container.resolve(AuthenicateUserService);

    const { user, token } = await authenicateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
