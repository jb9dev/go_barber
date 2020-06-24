import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

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
    throw new AppError('JWT token is missing.', 401);
  }

  try {
    const [_, token] = authorization.split(' ');
    const decoded = verify(token, secret);
    const { sub } = decoded as AuthToken;

    request.user = {
      id: sub,
    };
  } catch {
    throw new AppError('JWT token is not valid', 401);
  }

  return next();
}
