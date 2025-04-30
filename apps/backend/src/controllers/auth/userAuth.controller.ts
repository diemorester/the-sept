import { NextFunction, Request, Response } from "express";
import { forgotPasswordService, loginUserService, registerUserService, resetPasswordService, verifyUserService } from "../../services/auth/userAuth.service.js";

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

export const forgotPasswordController = async (req: Request, res: Response) => {
    await forgotPasswordService(req.body.email);

    return res.status(200).json({
        msg: "Password reset link sent to your email",
    });
};

export const resetPasswordController = async (req: Request, res: Response) => {
    const email = req.user?.email!;
    const { password } = req.body;

    await resetPasswordService(email, password);

    return res.status(200).json({
        status: 'ok',
        msg: 'Your password has been reset',
    });
};