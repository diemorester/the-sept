import { NextFunction, Request, Response } from "express";
import { changePasswordService, forgotPasswordService, loginUserService, registerUserService, resetPasswordService, verifyUserService } from "../../services/auth/auth.service.js";

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

    if (!email) throw new Error('Unauthorized');

    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({
            status: 'error',
            msg: 'Password must be at least 6 characters long',
        });
    }

    await resetPasswordService(email, password);

    return res.status(200).json({
        status: 'ok',
        msg: 'Your password has been reset',
    });
};

export const changePasswordController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) throw new Error('Unauthorized');

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || oldPassword.length < 6 || !newPassword || newPassword.length < 6)
        throw new Error('Password must be at least 6 characters long');

    await changePasswordService(userId, oldPassword, newPassword);

    return res.status(200).json({
        status: 'ok',
        msg: 'Password has been changed',
    });
};