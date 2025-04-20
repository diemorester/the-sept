import { Router } from "express";
import { UserController } from "../../controllers/auth/userAuth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export class UserRouter {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', asyncHandler(this.userController.registerUser));
    }

    getRouter(): Router {
        return this.router;
    }
}