import { Resend } from 'resend';
import env from '../../env';

export const resend = new Resend(env.EMAIL_RESEND_API_KEY)

export function sendEmailUsingResend(to: string[], subject: string, html: string) {
    return resend.emails.send({
        from: env.EMAIL_SENDER_EMAIL,
        to,
        subject,
        html,
    })
}
