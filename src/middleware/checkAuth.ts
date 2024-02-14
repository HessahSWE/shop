import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    if (!token) {
      return res.status(401).send('Authorization token required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);    next();
  } catch (error) {
    return res.status(401).send('Not authorized');
  }
};
