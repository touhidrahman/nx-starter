import { SelectUser } from '../db/schema'

export function safeUser(user: SelectUser) {
    return {
        ...user,
        password: undefined,
    }
}
