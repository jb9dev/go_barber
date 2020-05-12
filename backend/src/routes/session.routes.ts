import Router from 'express';

import AuthenicateUserService from '../services/AuthenicateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenicateUserService = new AuthenicateUserService();

  const { user, token } = await authenicateUserService.execute({
    email,
    password,
  });

  response.json({ user, token });
});

export default sessionsRouter;
