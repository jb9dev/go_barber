import Router from 'express';
import { container } from 'tsyringe';

import AuthenicateUserService from '@modules/users/services/AuthenicateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenicateUserService = container.resolve(AuthenicateUserService);

  const { user, token } = await authenicateUserService.execute({
    email,
    password,
  });

  response.json({ user, token });
});

export default sessionsRouter;
