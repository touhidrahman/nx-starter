import { Organization } from './organization.model'
import { User } from './user.model'

export interface UserLogDto {
    id?: string
    organizationId?: string
    entityName?: string
    entityId: string
    logText?: string
    logHtml?: string
    userId?: string
}

export interface UserLog extends UserLogDto {
    organization?: Organization
    user?: User

    createdAt: Date
    updatedAt: Date
}
