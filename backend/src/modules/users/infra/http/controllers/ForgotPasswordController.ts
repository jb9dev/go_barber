import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgorPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgorPasswordEmailService.execute({
      email,
    });

    return response.status(204).json();
  }
}
