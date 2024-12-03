export interface InviteUserEmailTemplateProps {
    inviterName: string
    inviteeName: string
    invitationUrl: string
    organizationName?: string
}
export const InviteUserEmailTemplate: string = `
<div>
    <h1>Hello, {{inviteeName}}!</h1>
    <p>
        {{inviterName}} has invited you to join {{organizationName}}.
    </p>
    <p>
        Please click the link below to accept the invitation:
        <br />
        <a href="{{invitationUrl}}">Join Now</a>
    </p>
    <p>If the link does not work, copy and paste the following URL into your browser:</p>
    <p>{{invitationUrl}}</p>
    <p>We look forward to having you on board!</p>
    <p>Thank you!</p>
</div>
`

export function buildInviteUserEmailTemplate(
    props: InviteUserEmailTemplateProps,
): string {
    let html = InviteUserEmailTemplate

    for (const [key, value] of Object.entries(props)) {
        if (value) {
            html = html.replaceAll(`{{${key}}}`, value)
        }
    }
    return html
}
