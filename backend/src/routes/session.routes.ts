import Router from 'express';

import AuthenicateUserService from '../services/AuthenicateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenicateUserService = new AuthenicateUserService();

    const { user, token } = await authenicateUserService.execute({
      email,
      password,
    });

    response.json({ user, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
