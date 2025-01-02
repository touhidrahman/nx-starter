import dayjs, { ManipulateType } from 'dayjs'
import { sign, verify } from 'hono/jwt'
import { randomBytes } from 'node:crypto'
import env from '../../env'
import { GroupDto } from '../group/group.schema'
import { User } from '../user/user.schema'

export type AccessTokenPayload = {
    firstName: string
    lastName: string
    email: string
    level: 'admin' | 'moderator' | 'user' | ''
    role: 'admin' | 'manager' | 'member' | ''
    groupId: string | ''
    groupType: 'client' | 'vendor' | ''
    sub: string // userId
    exp: number
}

export type RefreshTokenPayload = {
    email: string
    sub: string // userId
    exp: number
    groupId: string
}

export async function createAccessToken(
    user: User,
    role: 'admin' | 'manager' | 'member',
    group?: GroupDto,
) {
    const tokenPayload: AccessTokenPayload = {
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user.email,
        level: user.level,
        role: role,
        groupId: group?.id ?? '',
        groupType: group?.type ?? '',
        sub: user.id,
        exp:
            env.NODE_ENV !== 'production'
                ? dayjs().add(1, 'day').valueOf()
                : dayjs().add(15, 'minute').valueOf(),
    }

    return await sign(tokenPayload, env.ACCESS_TOKEN_SECRET)
}

export async function createRefreshToken(user: User, groupId?: string) {
    const tokenPayload: RefreshTokenPayload = {
        email: user.email,
        sub: user.id,
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
): Promise<{ email: string; userId: string } | null> {
    const verificationToken = token.split('&')
    const { email, sub, exp } = await verify(
        verificationToken[1],
        process.env.REFRESH_TOKEN_SECRET ?? '',
    )

    if (exp && exp < dayjs().valueOf()) return null
    return { email: email as string, userId: sub as string }
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
