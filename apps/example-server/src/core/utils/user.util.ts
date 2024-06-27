import { SelectUser } from '../db/schema/user.schema'

export function safeUser(user: SelectUser) {
    return {
        ...user,
        password: undefined,
    }
}
