import Router from 'express';

import AuthenicateUserService from '@modules/users/services/AuthenicateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();
  const authenicateUserService = new AuthenicateUserService(usersRepository);

  const { user, token } = await authenicateUserService.execute({
    email,
    password,
  });

  response.json({ user, token });
});

export default sessionsRouter;
