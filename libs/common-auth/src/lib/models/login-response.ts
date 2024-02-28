export interface LoginResponse<TUser> {
    user: TUser
    refreshToken: string
    accessToken: string
}
