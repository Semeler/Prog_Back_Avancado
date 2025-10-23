import { User } from '../models/user.model';

export class UserService {
    private users: User[] = [];

    constructor() {
        // Initialize with some mock users if needed
        this.users.push({ id: 1, name: 'Admin User', role: 'admin' });
        this.users.push({ id: 2, name: 'Regular User', role: 'user' });
        this.users.push({ id: 3, name: 'Moderator User', role: 'moderator' });
    }

    public getAllUsers(): User[] {
        return this.users;
    }

    public getUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    public updateUser(id: number, updatedUser: Partial<User>): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    public deleteUser(id: number): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}