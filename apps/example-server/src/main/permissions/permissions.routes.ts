import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { permissionsTable } from '../../core/db/schema'

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
app.post('/permissions', authMiddleware, async (c) => {
    const permissionSchema = z.object({
        groupId: z.number(),
        roleId: z.number(),
        area: z.string().min(1),
        access: z.number().min(0).max(5).optional(),
    })

    const body = await c.req.json()
    const parsedBody = permissionSchema.parse(body)

    const newPermission = await db
        .insert(permissionsTable)
        .values(parsedBody)
        .returning()

    return c.json({ data: newPermission, message: 'Permission created' })
})

// DELETE /permissions - delete many
app.delete('/permissions', authMiddleware, async (c) => {
    const deleteSchema = z.object({
        permissions: z
            .array(
                z.object({
                    groupId: z.number(),
                    roleId: z.number(),
                    area: z.string(),
                }),
            )
            .min(1),
    })

    const body = await c.req.json()
    const parsedBody = deleteSchema.parse(body)

    for (const permission of parsedBody.permissions) {
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
})

export default app
