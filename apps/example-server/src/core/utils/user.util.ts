import { SelectUser } from '../models/user.schema'

export function safeUser(user: SelectUser) {
    return {
        ...user,
        password: undefined,
    }
}
