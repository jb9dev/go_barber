import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface AuthToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenicated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;
  const { secret } = authConfig.jwt;

  if (!authorization) {
    throw Error('JWT token is missing.');
  }

  try {
    const [, token] = authorization.split(' ');
    const decoded = verify(token, secret);
    const { sub } = decoded as AuthToken;

    request.user = {
      id: sub,
    };
  } catch {
    throw new Error('JWT token is not valid');
  }

  return next();
}
