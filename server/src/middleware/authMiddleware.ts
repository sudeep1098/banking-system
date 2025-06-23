import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { IUserPayload } from '../types/jwt';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded: IUserPayload = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
