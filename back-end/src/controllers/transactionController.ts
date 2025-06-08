import { Request, Response } from 'express';
import { transferMoney } from '../services/transactionService';

export const transferHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fromAccountId, toAccountId, amount, description } = req.body;

        if (!fromAccountId || !toAccountId || !amount) {
            res.status(400).json({ error: 'Missing required fields' })
            return;
        }

        const transaction = await transferMoney(fromAccountId, toAccountId, amount, description);

        res.status(201).json({ success: true, transaction });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
