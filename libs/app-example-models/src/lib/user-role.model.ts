import { LabelValuePair } from '@myorg/common-models'

export enum UserRole {
    Member = 'Member',
    Manager = 'Manager',
    Owner = 'Owner',
}

export enum UserLevel {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}

export const USER_ROLES: LabelValuePair<UserRole>[] = [
    { label: 'Member', value: UserRole.Member },
    { label: 'Manager', value: UserRole.Manager },
    { label: 'Owner', value: UserRole.Owner },
]

export const ALL_USER_ROLES: UserRole[] = USER_ROLES.map(({ value }) => value)

const _userRoleMap: any = {}
for (const { label, value } of USER_ROLES) {
    _userRoleMap[value] = label
}

export const UserRoleMap: { [key: string]: string } = _userRoleMap
