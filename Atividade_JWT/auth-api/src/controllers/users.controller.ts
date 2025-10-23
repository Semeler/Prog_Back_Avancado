import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UsersController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async getUserData(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id; // Assuming user ID is set in req.user by auth middleware
            const userData = await this.userService.getUserById(userId);
            return res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching user data', error: error.message });
        }
    }

    public async updateUserData(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id;
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user data', error: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user.id;
            await this.userService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
}