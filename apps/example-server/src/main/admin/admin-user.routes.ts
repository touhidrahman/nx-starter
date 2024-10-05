import { and, eq, getTableColumns, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { groupsTable, authUsersTable } from '../../core/db/schema'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.get('/', async (c) => {
    const page = c.req.query('page')
    const pageSize = c.req.query('pageSize')

    // Initialize query builder with a join on groupsTable
    const query = db
        .select({
            ...getTableColumns(authUsersTable),
        })
        .from(authUsersTable)

    let totalUsers = 0
    let users = []

    if (page && pageSize) {
        const pageNumber = parseInt(page, 10)
        const pageSizeNumber = parseInt(pageSize, 10)

        const offset = (pageNumber - 1) * pageSizeNumber

        // Fetch total number of users
        const totalUsersResult = await db
            .select({ count: sql`COUNT(*)` })
            .from(authUsersTable)

        totalUsers = Number(totalUsersResult[0]?.count) || 0

        // Fetch paginated users with group data
        users = await query.limit(pageSizeNumber).offset(offset)

        return c.json({
            data: users,
            meta: {
                total: totalUsers,
                page: pageNumber,
                size: pageSizeNumber,
                totalPages: Math.ceil(totalUsers / pageSizeNumber),
            },
            message: 'List of Users',
            code: 200,
        })
    } else {
        // Fetch all users with group data
        users = await query

        return c.json({
            data: users,
            meta: {
                total: users.length,
                page: 1,
                size: users.length,
                totalPages: 1,
            },
            message: 'List of Users',
            code: 200,
        })
    }
})

app.post(
    '/approve',
    zValidator(
        'json',
        z.object({
            userId: z.number(),
        }),
    ),
    async (c) => {
        const { userId } = c.req.valid('json')

        try {
            const result = await db
                .update(authUsersTable)
                .set({ verified: true })
                .where(
                    and(
                        eq(authUsersTable.id, userId),
                        eq(authUsersTable.level, 'admin'),
                    ),
                )

            if (result.rowCount === 0) {
                return c.json(
                    { message: 'User not found or already approved' },
                    404,
                )
            }

            return c.json({ message: 'Admin account approved' })
        } catch (e) {
            return c.json({ message: 'Approval failed' }, 500)
        }
    },
)

app.put('/:id/make-admin', async (c) => {
    return c.json({ data: '', message: 'User updated' })
})

export default app
