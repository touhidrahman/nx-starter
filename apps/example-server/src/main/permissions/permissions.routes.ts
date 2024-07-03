import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { permissionsTable } from '../../core/db/schema'
import { zDeletePermission, zInsertPermission } from './permissions.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /permissions - list all
app.get('/permissions', authMiddleware, async (c) => {
    const permissions = await db
        .select({ ...getTableColumns(permissionsTable) })
        .from(permissionsTable)
        .limit(100) // Adjust limit as needed

    return c.json({ data: permissions, message: 'Permissions list' })
})

// POST /permissions - create one
app.post(
    '/permissions',
    zValidator('json', zInsertPermission),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newPermission = await db
            .insert(permissionsTable)
            .values(body)
            .returning()

        return c.json({ data: newPermission, message: 'Permission created' })
    },
)

// DELETE /permissions - delete many
app.delete(
    '/permissions',
    zValidator('json', zDeletePermission),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const permission of body.permissions) {
            await db
                .delete(permissionsTable)
                .where(
                    and(
                        eq(permissionsTable.groupId, permission.groupId),
                        eq(permissionsTable.roleId, permission.roleId),
                        eq(permissionsTable.area, permission.area),
                    ),
                )
        }

        return c.json({ message: 'Permissions deleted' })
    },
)

export default app
