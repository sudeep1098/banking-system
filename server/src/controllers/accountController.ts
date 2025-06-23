import { Request, Response } from 'express';
import Account from '../models/Account';

export const createAccount = async (req: Request, res: Response) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).json(account);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
