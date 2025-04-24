import generateToken from "../../libs/generateToken.js";
import { loginUserService, registerUserService, verifyUserService } from "../../services/auth/userAuth.service.js";
import { NextFunction, Request, Response } from "express";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = await registerUserService(req.body);

    return res.status(200).json({
        msg: "Account created, please check your email for verification",
        token
    });
};

export const verifyUserController = async (req: Request, res: Response) => {
    const user = await verifyUserService(req.user?.id!);

    const verificationResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    return res.status(200).json({
        msg: 'User Verified',
        verificationResponse,
    });
};

export const loginUserController = async (req: Request, res: Response) => {
    const { user, token } = await loginUserService(req.body);

    return res.status(200).json({
        message: "Login Success",
        user,
        token,
    });
};