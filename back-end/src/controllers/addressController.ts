import { Request, Response } from 'express';
import Address from '../models/Address';

export const createAddress = async (req: Request, res: Response) => {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).json(address);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
