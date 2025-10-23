import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;

        try {
            const { accessToken, refreshToken } = await this.authService.login(username, password);
            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    public async refresh(req: Request, res: Response): Promise<Response> {
        const { refreshToken } = req.body;

        try {
            const accessToken = await this.authService.refresh(refreshToken);
            return res.status(200).json({ accessToken });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}

export default new AuthController();