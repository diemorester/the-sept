import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { changePasswordController, forgotPasswordController, loginUserController, registerUserController, resetPasswordController, verifyUserController } from "../../controllers/auth/userAuth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', asyncHandler(registerUserController));
authRouter.post('/login', asyncHandler(loginUserController));
authRouter.post('/forgot-password', asyncHandler(forgotPasswordController));
authRouter.patch('/verify',
    asyncHandler(authMiddleware),
    asyncHandler(verifyUserController)
);
authRouter.patch('/reset-password',
    asyncHandler(authMiddleware),
    asyncHandler(resetPasswordController)
);
authRouter.patch('/change-password',
    asyncHandler(authMiddleware),
    asyncHandler(changePasswordController)
);

export default authRouter;