import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'coding';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extract token from Bearer scheme

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send('Token is invalid or expired');
    }

    // Attach decoded token (user payload) to request object
    req.body = decoded;

    next();
  });
};
