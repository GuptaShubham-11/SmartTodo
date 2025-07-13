import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Initialize express app
const app: Application = express();

if (!process.env.CLIENT_URL) {
  throw new Error('CLIENT_URL environment variable is not set');
}

// Middleware setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Routes
import userRouter from './routes/user.route';
import groupRouter from './routes/group.route';
import boardRouter from './routes/board.route';
import taskRouter from './routes/task.route';
import actionlogRouter from './routes/actionlog.route';
import dashboardRouter from './routes/dashboard.route';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/boards', boardRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/actionlogs', actionlogRouter);
app.use('/api/v1/dashboards', dashboardRouter);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
);

export { app };
