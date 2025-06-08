import { IUserPayload } from '../jwt';

declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload;
        }
    }
}

export {};
