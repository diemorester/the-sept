import { Request, Response } from "express";
import { editUserService, getMeService, removeAvatarService } from "../../services/user/user.service.js";

export const getMeController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            status: 'error',
            msg: 'UNATHORIZED',
        });
    }

    const user = await getMeService(userId);

    return res.status(200).json({
        user
    });
};

export const editUserController = async (req: Request, res: Response) => {
    const user = await editUserService(req.body, req.user?.id!, req.file?.filename);

    return res.status(200).json({
        status: 'ok',
        msg: 'User has been edited',
        user
    });
};

export const removeAvatarController = async (req: Request, res: Response) => {
    const user = await removeAvatarService(req.user?.id!);

    return res.status(200).json({
        status: 'ok',
        msg: 'Avatar has been removed',
        user,
    });
};