import { Organization } from './organization.model'
import { UserRole } from './user-role.model'

export interface InvitationDto {
    email: string
    firstName: string
    lastName: string
    organizationId: string
    role?: UserRole
    teamId?: string
}

export interface Invitation extends InvitationDto {
    id: string
    hasSeen: boolean
    organization?: Organization

    createdAt: Date
    updatedAt: Date
}
