import jwt from 'jsonwebtoken';
import { IUserPayload } from '../types/jwt';
import { UserDocument } from '../models/User';

export const generateToken = async (user: UserDocument): Promise<string> => {
  const populatedUser = await user.populate('roles');
  const roleNames = (populatedUser.roles as any[]).map(role => role.name);

  const payload: IUserPayload = {
    id: user._id.toString(),
    roles: roleNames,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};


export const verifyToken = (token: string): IUserPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
};