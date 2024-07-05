import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { profileTable } from '../../core/db/schema'
import {
    zDeleteProfile,
    zInsertProfile,
    zUpdateProfile,
} from './profile.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /profile - list all
app.get('/profile', authMiddleware, async (c) => {
    const profiles = await db
        .select({ ...getTableColumns(profileTable) })
        .from(profileTable)
        .limit(100)
    return c.json({ data: profiles, message: 'Profiles list' })
})

// GET /profile/:id - find one
app.get('/profile/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const profile = await db
        .select({ ...getTableColumns(profileTable) })
        .from(profileTable)
        .where(eq(profileTable.userId, id))
        .limit(1)

    if (profile.length === 0) {
        return c.json({ message: 'Profile not found' }, 404)
    }

    return c.json({ data: profile[0], message: 'Profile found' })
})

// POST /profile - create one
app.post(
    '/profile',
    zValidator('json', zInsertProfile),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newProfile = await db
            .insert(profileTable)
            .values(body)
            .returning()

        return c.json({ data: newProfile, message: 'Profile created' })
    },
)

// PATCH /profile/:id - update
app.patch(
    '/profile/:id',
    zValidator('json', zUpdateProfile),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedProfile = await db
            .update(profileTable)
            .set(body)
            .where(eq(profileTable.userId, id))
            .returning()

        return c.json({ data: updatedProfile, message: 'Profile updated' })
    },
)

// DELETE /profile/:id - delete
app.delete('/profile/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(profileTable).where(eq(profileTable.userId, id))

    return c.json({ message: 'Profile deleted' })
})

// DELETE /profile - delete many
app.delete(
    '/profile',
    zValidator('json', zDeleteProfile),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const profileId of body.profileIds) {
            await db
                .delete(profileTable)
                .where(eq(profileTable.userId, profileId))
        }

        return c.json({ message: 'Profiles deleted' })
    },
)

export default app
