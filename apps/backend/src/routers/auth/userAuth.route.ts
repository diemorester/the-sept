import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { forgotPasswordController, loginUserController, registerUserController, resetPasswordController, verifyUserController } from "../../controllers/auth/userAuth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', asyncHandler(registerUserController));
userRouter.post('/login', asyncHandler(loginUserController));
userRouter.post('/forgot-password', asyncHandler(forgotPasswordController));
userRouter.patch('/verify',
    asyncHandler(authMiddleware),
    asyncHandler(verifyUserController)
);
userRouter.patch('/reset-password',
    asyncHandler(authMiddleware),
    asyncHandler(resetPasswordController)
);

export default userRouter;