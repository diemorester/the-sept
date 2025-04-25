import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { loginUserController, registerUserController, verifyUserController } from "../../controllers/auth/userAuth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', asyncHandler(registerUserController));
userRouter.post('/login', asyncHandler(loginUserController));
userRouter.patch('/verify',
    asyncHandler(authMiddleware),
    asyncHandler(verifyUserController)
);

export default userRouter;