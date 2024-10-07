import dayjs from 'dayjs'
import { sign, verify } from 'hono/jwt'
import { randomBytes } from 'node:crypto'
import { toInt } from 'radash'
import { InsertGroup } from '../group/group.schema'
import { User } from '../user/user.schema'
import { AuthUser } from './auth.schema'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ''

export async function createAccessToken(
    authUser: AuthUser,
    user?: User,
    group?: InsertGroup,
) {
    return await sign(
        {
            userId: user?.id ?? '',
            firstName: user?.firstName ?? authUser.firstName,
            lastName: user?.lastName ?? authUser.lastName,
            email: authUser.email,
            level: authUser.level,
            role: user?.role ?? '',
            groupId: user?.groupId ?? '',
            groupType: group?.type ?? '',
            sub: authUser.id,
            exp: dayjs().add(15, 'minute').valueOf(),
        },
        accessTokenSecret,
    )
}

export async function createRefreshToken(authUser: AuthUser) {
    return await sign(
        {
            email: authUser.email,
            sub: authUser.id,
            exp: dayjs().add(7, 'day').valueOf(),
        },
        refreshTokenSecret,
    )
}

export async function decodeVerificationToken(
    token: string,
): Promise<{ email: string; authUserId: string } | null> {
    const verificationToken = token.split('&')
    const { email, sub, exp } = await verify(
        verificationToken[1],
        process.env.REFRESH_TOKEN_SECRET ?? '',
    )

    if (exp && exp < dayjs().valueOf()) return null
    return { email: email as string, authUserId: sub as string }
}

export async function createVerficationToken(email: string, userId: string) {
    const random = randomBytes(64).toString('hex')
    const token = await sign(
        { email, sub: userId, exp: dayjs().add(7, 'day').valueOf() },
        refreshTokenSecret,
    )
    return `${random}&${token}`
}

export async function createForgotPasswordToken(email: string, userId: string) {
    const token = sign(
        { email, sub: userId, exp: dayjs().add(1, 'hour').valueOf() },
        refreshTokenSecret,
    )

    return token
}
