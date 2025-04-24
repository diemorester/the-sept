import { readFile } from 'fs/promises';
import path from "path";
import handlebars from "handlebars";
import transporter from "../helpers/nodemailer.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MailOptions {
    to: string;
    subject: string;
    template: 'verify' | 'forgot-password' | 'otp';
    context: Record<string, any>;
}

const sendMail = async ({ to, subject, template, context }: MailOptions) => {
    //   const templatePath = path.join(__dirname, '../../../src/templates', 'verify.hbs');  route folder waktu deployment dulu
    const templatePath = path.join(__dirname, "../templates/verify.hbs");
    const source = await readFile(templatePath, 'utf-8');
    const compiled = handlebars.compile(source);
    const html = compiled({ context });

    await transporter.sendMail({
        to,
        subject,
        html,
    });
};

export default sendMail;