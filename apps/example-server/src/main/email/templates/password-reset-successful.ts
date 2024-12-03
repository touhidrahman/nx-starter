export interface passwordResetSuccessfulEmailTemplateProps {
    email: string
}
export const passwordResetSuccessfulEmailTemplate: string = `
<div>
    <h3>Your Password Has Been Successfully Reset</h3>
  <div>
    <h1>Hello, {{email}}</h1>
    <p>We wanted to let you know that your password has been successfully reset.</p>
    <p>If you did not initiate this action, please contact our support team immediately.</p>
    <p>Best regards,</p>
  </div>
</div>
`

export function buildpasswordResetSuccessfulEmailTemplate(
    props: passwordResetSuccessfulEmailTemplateProps,
): string {
    let html = passwordResetSuccessfulEmailTemplate

    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
