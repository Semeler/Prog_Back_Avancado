import express from 'express';
import { json } from 'body-parser';
import { authRoutes } from './routes/auth.routes';
import { usersRoutes } from './routes/users.routes';
import { errorHandler } from './middleware/error.middleware';
import { config } from './config';

const app = express();

app.use(json());
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use(errorHandler);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});