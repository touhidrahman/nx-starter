import { createRouter } from '../../core/create-app'
import { createAdminGroupHandler, createAdminGroupRoute,  } from './routes/create-admin-group'
import { deleteAdminGroupHandler, deleteAdminGroupRoute } from './routes/delete-admin-group'
import { getAdminGroupHandler, getAdminGroupRoute } from './routes/get-admin-group'
import { getAdminGroupsHandler, getAdminGroupsRoute } from './routes/get-admin-groups'
import { updateAdminGroupHandler, updateAdminGroupRoute } from './routes/update-admin-group'


export const adminGroupV1Routes = createRouter()
    .openapi(createAdminGroupRoute, createAdminGroupHandler)
    .openapi(getAdminGroupRoute, getAdminGroupHandler)
    .openapi(getAdminGroupsRoute, getAdminGroupsHandler)
    .openapi(updateAdminGroupRoute, updateAdminGroupHandler)
    .openapi(deleteAdminGroupRoute, deleteAdminGroupHandler)









// import { zValidator } from '@hono/zod-validator'
// import { eq, getTableColumns, inArray } from 'drizzle-orm'
// import { Hono } from 'hono'
// import { toInt } from 'radash'
// import { db } from '../../core/db/db'
// import { groupsTable } from '../../core/db/schema'
// import { isAdmin } from '../../core/middlewares/is-admin.middleware'
// import { zIds } from '../../core/models/common.schema'
// import { checkToken } from '../auth/auth.middleware'
// import {
//     deleteGroup,
//     deleteManyGroups,
//     findGroupById,
//     updateGroup,
//     verifyGroup,
// } from '../group/group.service'
// import { zUpdateGroup } from '../group/group.schema'

// const app = new Hono()

// app.get('/', checkToken, isAdmin, async (c) => {
//     const { page, size } = c.req.query()
//     const offset = (toInt(page, 1) - 1) * toInt(size)
//     const limit = toInt(size, 10)
//     const result = await db
//         .select()
//         .from(groupsTable)
//         .limit(limit)
//         .offset(offset)

//     return c.json({ data: result, message: 'Groups list' })
// })

// // Get a Group by ID
// app.get('/:id', checkToken, isAdmin, async (c) => {
//     const id = c.req.param('id')

//     const result = await findGroupById(id)

//     if (!result) {
//         return c.json({ error: 'Group not found' }, 404)
//     }

//     return c.json({ data: result, message: 'Group details' })
// })

// // Mark a vendor as verified
// app.put('/:id/verify', checkToken, isAdmin, async (c) => {
//     const id = c.req.param('id')
//     const result = await verifyGroup(id)

//     return c.json({ data: result, message: 'Group verified' })
// })

// // Delete many Groups
// app.delete('/', zValidator('json', zIds), async (c) => {
//     const { ids } = await c.req.json()
//     const result = await deleteManyGroups(ids)

//     return c.json({
//         message: 'Groups with given IDs deleted',
//         count: result.length,
//     })
// })

// // delete one group
// app.delete('/:id', checkToken, isAdmin, async (c) => {
//     const id = c.req.param('id')
//     const result = await deleteGroup(id)

//     return c.json({ message: 'Group deleted', data: result })
// })

// // update group
// app.put(
//     '/:id',
//     checkToken,
//     isAdmin,
//     zValidator('json', zUpdateGroup),
//     async (c) => {
//         const id = c.req.param('id')
//         const body = c.req.valid('json')
//         const result = await updateGroup(id, body)

//         if (result.length === 0) {
//             return c.json({ error: 'Group not found' }, 404)
//         }

//         return c.json({ data: result[0], message: 'Group updated' })
//     },
// )

// export default app
