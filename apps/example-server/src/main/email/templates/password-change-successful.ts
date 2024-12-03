export interface passwordChangeSuccessfulEmailTemplateProps {
    email: string
}
export const passwordChangeSuccessfulEmailTemplate: string = `
<div>
    <h3>Your Password Has Been changed Successfully</h3>
  <div>
    <h1>Hello, {{email}}</h1>
    <p>We wanted to let you know that your password has been successfully changed.</p>
    <p>If you did not initiate this action, please contact our support team immediately.</p>
    <p>Best regards,</p>
  </div>
</div>
`

export function buildpasswordChangeSuccessfulEmailTemplate(
    props: passwordChangeSuccessfulEmailTemplateProps,
): string {
    let html = passwordChangeSuccessfulEmailTemplate

    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
