import { SelectUser } from '../db/schema/auth.schema'

export function safeUser(user: SelectUser) {
    return {
        ...user,
        password: undefined,
    }
}
