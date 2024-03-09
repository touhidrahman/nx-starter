import { Organization } from './organization.model'
import { UserRole } from './user-role.model'

export interface UserProfile {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
}

export interface UserDto {
    email: string
    firstName: string
    hasAcceptedTerms: boolean
    isActive: boolean
    isApproved: boolean
    isOwner: boolean
    lastName: string
    organizationId: string
    permissions: UserPermissions
    profileImage?: string
    role: UserRole
    preferredCurrency: 'USD' | 'BDT'
    preferredLanguage: 'en' | 'bn'

}

export interface User extends UserDto {
    id: string
    organization?: Organization

    createdAt: Date
    updatedAt: Date
}

export interface UserPermissions {
    advertisements: Permission[]
    advertisers: Permission[]
    contents: Permission[]
    feedbacks: Permission[]
    profile: Permission[]
    users: Permission[]
}

export type UserPermissionKeys = keyof UserPermissions

export enum Permission {
    Read = 'Read',
    Write = 'Write',
    Delete = 'Delete',
}
