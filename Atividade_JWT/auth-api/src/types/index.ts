export interface User {
    id: string;
    name: string;
    role: 'admin' | 'moderator' | 'user';
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshToken {
    token: string;
    userId: string;
    expiresAt: Date;
}