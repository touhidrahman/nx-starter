import { LabelValuePair } from '@my-nx-starter/common-models'

export enum UserRole {
    Advertiser = 'Advertiser',
    Customer = 'Customer',
    Manager = 'Manager',
    Owner = 'Owner',
}

export const USER_ROLES: LabelValuePair<UserRole>[] = [
    { label: 'Advertiser', value: UserRole.Advertiser },
    { label: 'Manager', value: UserRole.Manager },
    { label: 'Owner', value: UserRole.Owner },
    { label: 'Customer', value: UserRole.Customer },
]

export const ALL_USER_ROLES: UserRole[] = USER_ROLES.map(({ value }) => value)

const _userRoleMap: any = {}
for (const { label, value } of USER_ROLES) {
    _userRoleMap[value] = label
}

export const UserRoleMap: { [key: string]: string } = _userRoleMap
