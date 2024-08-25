export type UserRoute = {
    id: number
    title: string
    path: string
}

export const userRoute: UserRoute[] = [
    {
        id: 1,
        title: 'Profile',
        path: 'details',
    },
    {
        id: 2,
        title: 'Edit profile',
        path: 'edit-profile',
    },
    {
        id: 3,
        title: 'Password Change',
        path: 'password-change',
    },
]
