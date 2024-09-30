import { SelectAuthUser } from '../auth/auth.schema'

export function safeUser(user: SelectAuthUser) {
    return {
        ...user,
        password: undefined,
    }
}
