import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    role: 'admin' | 'moderator' | 'user';
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export { User, IUser };