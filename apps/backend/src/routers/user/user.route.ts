import { Router } from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import { getMeController } from "../../controllers/user/user.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";

const userRouter = Router();

userRouter.get('/me',
    asyncHandler(authMiddleware),
    asyncHandler(getMeController)
);

export default userRouter;