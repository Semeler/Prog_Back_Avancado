import request from 'supertest';
import app from '../src/app';
import { createUser, loginUser } from './utils/testUtils';

describe('Authentication API', () => {
  let refreshToken;

  beforeAll(async () => {
    await createUser({ username: 'testuser', password: 'password123' });
  });

  describe('POST /login', () => {
    it('should return access and refresh tokens for valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      refreshToken = response.body.refreshToken;
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /refresh', () => {
    it('should return a new access token for a valid refresh token', async () => {
      const response = await request(app)
        .post('/refresh')
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return 401 for an invalid refresh token', async () => {
      const response = await request(app)
        .post('/refresh')
        .send({ refreshToken: 'invalidtoken' });

      expect(response.status).toBe(401);
    });
  });
});