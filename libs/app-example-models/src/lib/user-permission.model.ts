import { UserDto, UserPermissions, Permission } from './user.model'

export function getUserImageNamesConcatenated(UserDtos: UserDto[]) {
    const imageNames = UserDtos.filter((user) => user.profileImage).map(
        (user) => user.profileImage,
    )

    return imageNames.join('&')
}

// different permissions for different role
export function getDefaultPermissions(): UserPermissions {
    return {
        profile: [Permission.Write, Permission.Read],
        contents: [Permission.Read],
        users: [Permission.Read],
        feedbacks: [Permission.Write],
        advertisements: [],
        advertisers: [],
    }
}

export function getOwnerPermissions(): UserPermissions {
    return {
        profile: [Permission.Write, Permission.Read, Permission.Delete],
        contents: [Permission.Write, Permission.Read, Permission.Delete],
        users: [Permission.Write, Permission.Read, Permission.Delete],
        feedbacks: [Permission.Write, Permission.Read, Permission.Delete],
        advertisements: [],
        advertisers: [],
    }
}

export function getAdvertiserPermissions(): UserPermissions {
    return {
        profile: [Permission.Write, Permission.Read],
        contents: [],
        users: [Permission.Write, Permission.Read, Permission.Delete],
        feedbacks: [Permission.Write, Permission.Read, Permission.Delete],
        advertisements: [Permission.Write, Permission.Read, Permission.Delete],
        advertisers: [Permission.Write, Permission.Read, Permission.Delete],
    }
}

export function getManagerPermissions(): UserPermissions {
    return {
        profile: [Permission.Write, Permission.Read, Permission.Delete],
        contents: [Permission.Write, Permission.Read, Permission.Delete],
        users: [Permission.Write, Permission.Read, Permission.Delete],
        feedbacks: [Permission.Write, Permission.Read, Permission.Delete],
        advertisements: [],
        advertisers: [],
    }
}

export function getCustomerPermissions(): UserPermissions {
    return {
        profile: [Permission.Write, Permission.Read],
        contents: [Permission.Read],
        users: [Permission.Read],
        feedbacks: [Permission.Write],
        advertisements: [Permission.Read],
        advertisers: [Permission.Read],
    }
}
