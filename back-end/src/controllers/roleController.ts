import { Request, Response } from 'express';
import Role from '../models/Role';

// Create Role
export const createRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions, inherits } = req.body;
        const role = new Role({ name, permissions, inherits });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Get all roles with populated permissions and inherits
export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find()
            .populate('permissions')
            .populate('inherits');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get single role by id with populated fields
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const role = await Role.findById(req.params.id)
            .populate('permissions')
            .populate('inherits');

        if (!role) {
            res.status(404).json({ message: 'Role not found' })
            return;
        };
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, permissions, inherits } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, permissions, inherits },
            { new: true }
        );

        if (!updatedRole) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }

        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
};