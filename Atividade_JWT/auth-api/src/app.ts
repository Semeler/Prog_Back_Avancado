import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';
import { usersRoutes } from './routes/users.routes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;