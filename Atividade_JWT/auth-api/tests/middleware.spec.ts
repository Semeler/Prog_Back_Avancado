import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../src/middleware/auth.middleware';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    const mockRequest = (headers: any) => ({
        headers,
    } as Request);

    const mockResponse = () => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const mockNext = jest.fn() as NextFunction;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next if token is valid', () => {
        const token = 'valid.token';
        const req = mockRequest({ authorization: `Bearer ${token}` });
        const res = mockResponse();

        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, { id: 1, name: 'Test User', role: 'admin' });
        });

        authMiddleware(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', () => {
        const req = mockRequest({});
        const res = mockResponse();

        authMiddleware(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        const token = 'invalid.token';
        const req = mockRequest({ authorization: `Bearer ${token}` });
        const res = mockResponse();

        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('Token is invalid'), null);
        });

        authMiddleware(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token is expired', () => {
        const token = 'expired.token';
        const req = mockRequest({ authorization: `Bearer ${token}` });
        const res = mockResponse();

        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback({ name: 'TokenExpiredError' }, null);
        });

        authMiddleware(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token expired' });
        expect(mockNext).not.toHaveBeenCalled();
    });
});