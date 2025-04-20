import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import { UserRouter } from './routers/auth/userAuth.route.js';

export default class App {
    private readonly app: Express;
    private readonly PORT = process.env.PORT || 8000;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandlers();
    }

    private setupMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setupErrorHandlers(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.path.includes('/api')) {
                res.status(404).send('Not found!');
            } else {
                next();
            }
        });

        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                if (req.path.includes('/api/')) {
                    console.error('[ERROR]', err.stack);
                    res.status(500).send(err.message);
                } else {
                    next();
                }
            },
        );
    }

    private setupRoutes(): void {
        const userRouter = new UserRouter();

        this.app.get('/api', (req: Request, res: Response) => {
            res.send('the-sept')
        });

        this.app.use('/api/user', userRouter.getRouter());
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
        });
    }
}