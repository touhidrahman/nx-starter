export interface SuccessEmailTemplateProps {
    recipientName: string
    profileType: 'vendor' | 'client'
    dashboardUrl: string
    organizationName?: string
}

export const SuccessEmailTemplate: string = `
<div>
    <h1>Congratulations, {{recipientName}}!</h1>
    <p>
        Your {{profileType}} profile has been successfully created on {{organizationName}}.
    </p>
    <p>
        You can now log in to your dashboard and start managing your activities. Use the link below to access your dashboard:
        <br />
        <a href="{{dashboardUrl}}">Go to Dashboard</a>
    </p>
    <p>If the link does not work, copy and paste the following URL into your browser:</p>
    <a style="text-decoration: underline" href="{{dashboardUrl}}">Click Here</a>
    <p>Thank you for choosing {{organizationName}}!</p>
</div>
`

export function buildSuccessEmailTemplate(
    props: SuccessEmailTemplateProps,
): string {
    let html = SuccessEmailTemplate

    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
