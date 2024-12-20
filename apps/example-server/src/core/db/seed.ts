import { db } from './db'
import { authUsersTable } from './schema'

export const seed = async () => {
    await db.insert(authUsersTable).values({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super@admin.com',
        password: 'Abcd1234!',
        level: 'admin',
    })

    console.log('Database seeded successfully')
}
