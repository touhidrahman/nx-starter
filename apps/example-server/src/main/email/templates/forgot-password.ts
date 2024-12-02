export interface ForgotPasswordEmailTemplateProps {
    firstName: string
    lastName: string
    resetPasswordUrl: string
}

export const ForgotPasswordEmailTemplate: string = `
<div>
    <h1>Hi {{firstName}} {{lastName}},</h1>
    <p>
        We received a request to reset your password. If you made this request, you can reset your password by
        <a href="{{resetPasswordUrl}}">clicking here</a>.
    </p>
    <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
    <p>If the link above does not work, please copy and paste the following URL into your browser:</p>
    <p>{{resetPasswordUrl}}</p>
    <p>Thank you!</p>
</div>
`

export function buildForgotPasswordEmailTemplate(
    props: ForgotPasswordEmailTemplateProps,
) {
    let html = ForgotPasswordEmailTemplate
    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
