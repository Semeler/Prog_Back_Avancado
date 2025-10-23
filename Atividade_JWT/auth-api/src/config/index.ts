import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '15m',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
};

export default config;