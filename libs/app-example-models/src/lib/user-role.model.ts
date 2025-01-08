import { LabelValuePair } from '@myorg/common-models'

export enum UserRole {
    Member = 'member',
    Manager = 'manager',
    Admin = 'admin',
}

export enum UserLevel {
    Admin = 'admin',
    Moderator = 'moderator',
    User = 'user',
}

export const USER_ROLES: LabelValuePair<UserRole>[] = [
    { label: 'Member', value: UserRole.Member },
    { label: 'Manager', value: UserRole.Manager },
    { label: 'Admin', value: UserRole.Admin },
]

export const ALL_USER_ROLES: UserRole[] = USER_ROLES.map(({ value }) => value)

const _userRoleMap: any = {}
for (const { label, value } of USER_ROLES) {
    _userRoleMap[value] = label
}

export const UserRoleMap: { [key: string]: string } = _userRoleMap
