import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import 'express-async-errors';

import AppError from './errors/AppError';
import routes from './routes';
import 'reflect-metadata';

import './database';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    // eslint-disable-next-line
    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen('3333', () => {
  console.log('🚀️ Server running on port 3333!'); // eslint-disable-line
});
