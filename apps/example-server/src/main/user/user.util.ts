import { SelectUser } from './user.schema'

export function safeUser(user: SelectUser) {
    return {
        ...user,
        password: undefined,
    }
}
