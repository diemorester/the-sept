import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRouter from './routers/auth/auth.route.js';
import userRouter from './routers/user/user.route.js';

export const createApp = (): Express => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/api', (req: Request, res: Response) => {
        res.send('the-sept');
    });

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api')) {
            res.status(404).send('Not found!');
        } else {
            next();
        }
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
            console.error('[ERROR]', err.stack);
            res.status(500).send(err.message);
        } else {
            next();
        }
    });

    return app;
};