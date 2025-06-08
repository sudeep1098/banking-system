import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id)
            .populate('accounts')
            .populate('addresses')
            .populate('governmentIds');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const assignRolesToUser = async (req: Request, res: Response) => {
    const { roleIds } = req.body;
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { roles: roleIds },
        { new: true }
    ).populate('roles');

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    };
    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    };
    res.json({ message: 'User deleted' });
};