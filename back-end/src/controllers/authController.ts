import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { UserDocument } from '../models/User';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, email, fullName, phone } = req.body;

        // Basic validation
        if (!username || !password || !email || !fullName || !phone) {
            res.status(400).json({ message: 'Please fill all required fields' });
            return;
        }

        // Check if username or email already exists
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            res.status(400).json({ message: 'Username or email already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user: UserDocument = new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            phone
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Please provide username and password' });
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = await generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
