import sendVerificationEmail from "../../helpers/sendVerificationEmail.js";
import generateToken from "../../helpers/tokenGenerator.js";
import { registerUserService, verifyUserService } from "../../services/auth/userAuth.service.js";
import { Request, Response } from "express";

export class UserController {
    async registerUserController(req: Request, res: Response) {
        const user = await registerUserService(req.body);

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        const token = generateToken(payload, res);
        const link = `${process.env.BASE_URL_WEB}/verify/${token}`;

        await sendVerificationEmail(user.email, link);

        return res.status(200).send({
            msg: "Account created, please check your email for verification",
            token
        })
    }

    async verifyUserController(req: Request, res: Response) {
        const user = await verifyUserService(req.user?.id!)

        return res.status(200).send({
            msg: 'User Verified',
            user,
        });
    }
}