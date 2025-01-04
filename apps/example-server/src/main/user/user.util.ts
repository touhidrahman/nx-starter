import { User } from './user.schema'

export function passwordRemoved(user: User): User {
    return { ...user, password: '' }
}
