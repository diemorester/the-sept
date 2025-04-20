import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import transporter from "./nodemailer.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const sendVerificationEmail = async (email: string, link: string) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const templatePath = path.join(__dirname, "../templates/verify.hbs");
    //   const templatePath = path.join(__dirname, '../../../src/templates', 'verify.hbs');  route folder waktu deployment dulu
    const source = fs.readFileSync(templatePath, "utf-8");
    const compiled = handlebars.compile(source);
    const html = compiled({ link });

    await transporter.sendMail({
        to: email,
        subject: "Verify your account",
        html,
    });
};

export default sendVerificationEmail;