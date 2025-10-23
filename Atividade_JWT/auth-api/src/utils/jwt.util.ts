import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/index';

const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRATION = '15m'; // Access token expiration
const REFRESH_TOKEN_EXPIRATION = '7d'; // Refresh token expiration

export const generateAccessToken = (user: User) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};