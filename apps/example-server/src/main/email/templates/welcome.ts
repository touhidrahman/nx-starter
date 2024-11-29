export interface WelcomeEmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  verificationUrl: string
}

export const WelcomeEmailTemplate: string = (
`
<div>
    <h1>Welcome, {{firstName}} {{lastName}}!</h1>
    <p>
        We are excited to have you on board. Please verify your email address by
        <a href="{{verificationUrl}}">clicking here</a>.
    </p>
    <p> If the link above does not work, please copy and paste the following URL into your browser:</p>
    <p>{{verificationUrl}}</p>
    <p>Thank you!</p>
</div>
`)

export function buildWelcomeEmailTemplate(props: WelcomeEmailTemplateProps) {
    let html = WelcomeEmailTemplate
    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
