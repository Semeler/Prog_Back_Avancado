import { User } from '../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository';

export class AuthService {
    private refreshTokenRepository: RefreshTokenRepository;

    constructor() {
        this.refreshTokenRepository = new RefreshTokenRepository();
    }

    async login(username: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.validateCredentials(username, password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const accessToken = generateAccessToken({ id: user.id, name: user.name, role: user.role });
        const refreshToken = generateRefreshToken(user.id);

        await this.refreshTokenRepository.storeRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    async refresh(refreshToken: string): Promise<string> {
        const userId = await this.refreshTokenRepository.validateRefreshToken(refreshToken);
        if (!userId) {
            throw new Error('Invalid or expired refresh token');
        }

        const newAccessToken = generateAccessToken({ id: userId });
        return newAccessToken;
    }

    async revokeRefreshToken(refreshToken: string): Promise<void> {
        await this.refreshTokenRepository.revokeRefreshToken(refreshToken);
    }

    private async validateCredentials(username: string, password: string): Promise<User | null> {
        // Mock user validation. Replace with actual database call.
        const mockUser: User = { id: '1', name: 'John Doe', role: 'user', username: 'john', password: 'password' };
        if (username === mockUser.username && password === mockUser.password) {
            return mockUser;
        }
        return null;
    }
}