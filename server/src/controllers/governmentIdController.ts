import { Request, Response } from 'express';
import GovernmentId from '../models/GovernmentId';

export const createGovernmentId = async (req: Request, res: Response) => {
    try {
        const govId = new GovernmentId(req.body);
        await govId.save();
        res.status(201).json(govId);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
