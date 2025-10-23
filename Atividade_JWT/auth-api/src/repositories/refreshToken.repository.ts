import { v4 as uuidv4 } from 'uuid';

interface RefreshToken {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
}

const refreshTokenStore: RefreshToken[] = [];

export const createRefreshToken = (userId: string, expiresIn: number): RefreshToken => {
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const refreshToken: RefreshToken = { id: uuidv4(), userId, token, expiresAt };
    refreshTokenStore.push(refreshToken);
    return refreshToken;
};

export const findRefreshToken = (token: string): RefreshToken | undefined => {
    return refreshTokenStore.find(rt => rt.token === token);
};

export const revokeRefreshToken = (token: string): boolean => {
    const index = refreshTokenStore.findIndex(rt => rt.token === token);
    if (index !== -1) {
        refreshTokenStore.splice(index, 1);
        return true;
    }
    return false;
};

export const isRefreshTokenValid = (token: string): boolean => {
    const refreshToken = findRefreshToken(token);
    return refreshToken !== undefined && refreshToken.expiresAt > new Date();
};