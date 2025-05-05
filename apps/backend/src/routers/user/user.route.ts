import { Router } from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import { editUserController, getMeController, removeAvatarController } from "../../controllers/user/user.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { uploader } from "../../libs/uploader.js";

const userRouter = Router();

userRouter.get('/me',
    asyncHandler(authMiddleware),
    asyncHandler(getMeController)
);
userRouter.patch('/edit',
    asyncHandler(authMiddleware),
    uploader('avatar', '/avatar').single('avatar'),
    asyncHandler(editUserController)
);
userRouter.patch('/remove-avatar',
    asyncHandler(authMiddleware),
    asyncHandler(removeAvatarController)
);

export default userRouter;