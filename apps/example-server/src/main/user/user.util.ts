import { AuthUser } from '../auth/auth.schema'

export function safeUser(user: AuthUser) {
    return {
        ...user,
        password: undefined,
    }
}
