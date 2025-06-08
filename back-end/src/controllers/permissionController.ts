import { Request, Response } from 'express';
import Permission from '../models/Permission';

// Create Permission
export const createPermission = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const permission = new Permission({ name, description });
        await permission.save();
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Get all permissions
export const getPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getPermissionById = async (req: Request, res: Response) => {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
        return;
    };
    res.json(permission);
};

export const updatePermission = async (req: Request, res: Response) => {
    const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
        return;
    };
    res.json(permission);
};

export const deletePermission = async (req: Request, res: Response) => {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
        return;
    };
    res.json({ message: 'Permission deleted' });
};
