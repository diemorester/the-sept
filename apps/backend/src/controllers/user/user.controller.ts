import { Request, Response } from "express";
import { getMeService } from "../../services/user/user.service.js";

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