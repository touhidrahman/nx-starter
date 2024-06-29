import { logger } from 'hono/logger'
import { db } from './db'
import { usersTable } from './schema'

export const seed = async () => {
    await db.insert(usersTable).values({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super@admin.com',
        password: 'password',
        type: 'admin',
    })

    console.log('Database seeded successfully')
}
