import { Router } from "express";
import { UserController } from "../../controllers/auth/userAuth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

export class UserRouter {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', asyncHandler(this.userController.registerUserController));
        this.router.patch(
            '/verify',
            asyncHandler(authMiddleware),
            asyncHandler(this.userController.verifyUserController)
          );
    }

    getRouter(): Router {
        return this.router;
    }
}