import dayjs, { ManipulateType } from 'dayjs'
import { sign, verify } from 'hono/jwt'
import { randomBytes } from 'node:crypto'
import env from '../../env'
import { GroupDto } from '../group/group.schema'
import { User } from '../user/user.schema'
import { AuthUser } from './auth.schema'

export type AccessTokenPayload = {
    userId: string
    firstName: string
    lastName: string
    email: string
    level: 'admin' | 'moderator' | 'user' | ''
    role: 'owner' | 'manager' | 'member' | ''
    groupId: string | ''
    groupType: 'client' | 'vendor' | ''
    sub: string // authUserId
    exp: number
}

export type RefreshTokenPayload = {
    email: string
    sub: string // authUserId
    exp: number
    groupId: string
}

export async function createAccessToken(
    authUser: AuthUser,
    user?: User,
    group?: GroupDto,
) {
    const tokenPayload: AccessTokenPayload = {
        userId: user?.id ?? '',
        firstName: user?.firstName ?? authUser.firstName,
        lastName: user?.lastName ?? authUser.lastName,
        email: authUser.email,
        level: authUser.level,
        role: user?.role as any,
        groupId: user?.groupId ?? '',
        groupType: group?.type ?? '',
        sub: authUser.id,
        exp:
            env.NODE_ENV !== 'production'
                ? dayjs().add(1, 'day').valueOf()
                : dayjs().add(15, 'minute').valueOf(),
    }

    return await sign(tokenPayload, env.ACCESS_TOKEN_SECRET)
}

export async function createRefreshToken(authUser: AuthUser, groupId?: string) {
    const tokenPayload: RefreshTokenPayload = {
        email: authUser.email,
        sub: authUser.id,
        exp: dayjs().add(7, 'day').valueOf(),
        groupId: groupId ?? '',
    }
    return await sign(tokenPayload, env.REFRESH_TOKEN_SECRET)
}

export async function decodeRefreshToken(
    token: string,
): Promise<RefreshTokenPayload | null> {
    const { email, sub, exp, groupId } = await verify(
        token,
        env.REFRESH_TOKEN_SECRET,
    )
    if (exp && exp < dayjs().valueOf()) return null
    return {
        email: email as string,
        sub: sub as string,
        groupId: groupId as string,
        exp: exp as number,
    }
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

export async function createVerficationToken(
    email: string,
    userId: string,
    duration: { value: number; unit: ManipulateType },
) {
    const random = randomBytes(64).toString('hex')
    const token = await sign(
        {
            email,
            sub: userId,
            exp: dayjs().add(duration.value, duration.unit).valueOf(),
        },
        env.REFRESH_TOKEN_SECRET,
    )
    return `${random}&${token}`
}
