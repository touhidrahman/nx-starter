import { createRouter } from '../../core/create-app'
import { getGroupsHandler, getGroupsRoute } from './routes/get-groups'
import { createGroupRoute, createGroupHandler } from './routes/create-group'
import { getGroupByIdHandler, getGroupByIDRoute } from './routes/get-groupById'
import {
    updateGroupByIdRoute,
    updateGroupHandler,
} from './routes/update-groupById'
import {
    deleteGroupByIdRoute,
    deleteGroupHandler,
} from './routes/delete-groupById'

export const groupsV1Route = createRouter()
    .openapi(getGroupsRoute, getGroupsHandler)
    .openapi(createGroupRoute, createGroupHandler)
    .openapi(getGroupByIDRoute, getGroupByIdHandler)
    .openapi(updateGroupByIdRoute, updateGroupHandler)
    .openapi(deleteGroupByIdRoute, deleteGroupHandler)

//
// import { zValidator } from '@hono/zod-validator'
// import { Hono } from 'hono'
// import { z } from 'zod'
// import {
//     isGroupOwner,
//     isGroupParticipant,
// } from '../../core/middlewares/is-group-owner.middleware'
// import { checkToken } from '../auth/auth.middleware'
// import { findAuthUserByEmail } from '../auth/auth.service'
// import { ROLE_MEMBER } from '../user/user.schema'
// import {
//     createUser,
//     deleteUser,
//     findUserByUserIdAndGroupId,
//     updateUser,
//     userExists,
// } from '../user/user.service'
// import { zInsertGroup, zUpdateGroup } from './group.schema'
// import {
//     createGroup,
//     deleteGroup,
//     findGroupById,
//     findGroupsByAuthUserId,
//     isOwner,
//     isParticipant,
//     updateGroup,
// } from './group.service'
//
// const app = new Hono()
//
// // Get my Groups
// app.get('/', checkToken, async (c) => {
//     const payload = c.get('jwtPayload')
//     const result = await findGroupsByAuthUserId(payload.sub)
//
//     return c.json({ data: result, message: 'My Groups' })
// })
//
// // Get a Group by ID
// app.get('/:id', checkToken, isGroupParticipant, async (c) => {
//     const id = c.req.param('id')
//     const result = await findGroupById(id)
//
//     if (!result) {
//         return c.json({ error: 'Group not found' }, 404)
//     }
//
//     return c.json({ data: result, message: 'Group details' })
// })
//
// // Create a new Group. Can create only one group
// app.post('/', zValidator('json', zInsertGroup), checkToken, async (c) => {
//     const body = c.req.valid('json')
//     const { userId, role, groupId } = await c.get('jwtPayload')
//     try {
//         // check if group already created where he is a owner
//         const hasOwnedGroup = await isOwner(userId, groupId)
//         if (hasOwnedGroup) {
//             return c.json(
//                 {
//                     message: 'You already have a group owned by you',
//                 },
//                 403,
//             )
//         }
//
//         // Insert a new entry into groups
//         const [newGroup] = await createGroup({ ...body, ownerId: userId })
//
//         return c.json({ data: newGroup, message: 'Group created' }, 201)
//     } catch (error) {
//         return c.json({ error, message: 'Error creating group' }, 500)
//     }
// })
//
// // Update a Group by ID
// app.put(
//     '/:id',
//     zValidator('json', zUpdateGroup),
//     checkToken,
//     isGroupOwner,
//     async (c) => {
//         const id = c.req.param('id')
//         const body = c.req.valid('json')
//         const result = await updateGroup(id, body)
//
//         if (result.length === 0) {
//             return c.json({ error: 'Group not found' }, 404)
//         }
//
//         return c.json({ data: result[0], message: 'Group updated' })
//     },
// )
//
// // Delete a Group by ID
// app.delete('/:id', checkToken, isGroupOwner, async (c) => {
//     const id = c.req.param('id')
//     const result = await deleteGroup(id)
//
//     if (result.length === 0) {
//         return c.json({ error: 'Group not found' }, 404)
//     }
//
//     return c.json({ data: result, message: 'Group deleted' })
// })
//
// // add auth user to group by email
// app.post(
//     '/:id/add-user',
//     zValidator('json', z.object({ email: z.string() })),
//     checkToken,
//     isGroupOwner,
//     async (c) => {
//         const id = c.req.param('id')
//         const { email } = c.req.valid('json')
//
//         try {
//             const authUser = await findAuthUserByEmail(email.toLowerCase())
//
//             if (!authUser) {
//                 return c.json({ error: 'User not found' }, 404)
//             }
//
//             const exists = await isParticipant(authUser.id, id)
//             if (exists) {
//                 return c.json({ error: 'User already belongs to group' }, 400)
//             }
//
//             const result = await createUser({
//                 authUserId: authUser.id,
//                 groupId: id,
//                 role: ROLE_MEMBER,
//                 firstName: authUser.firstName,
//                 lastName: authUser.lastName,
//                 email: authUser.email,
//             })
//
//             return c.json({ data: result, message: 'User added to group' }, 201)
//         } catch (error) {
//             return c.json({ error: 'Error adding user to group' }, 500)
//         }
//     },
// )
//
// app.post(
//     '/:id/update-user-role',
//     zValidator('json', z.object({ userId: z.string(), role: z.string() })),
//     checkToken,
//     isGroupOwner,
//     async (c) => {
//         const id = c.req.param('id')
//         const { userId, role } = c.req.valid('json')
//
//         try {
//             const exists = await userExists(userId)
//             if (!exists) {
//                 return c.json({ error: 'User not found' }, 404)
//             }
//             const user = await findUserByUserIdAndGroupId(userId, id)
//             if (!user) {
//                 return c.json({ error: 'User does not belong to group' }, 400)
//             }
//
//             const result = await updateUser(user.id, { role: role as any })
//
//             return c.json({ data: result, message: 'User role updated' }, 201)
//         } catch (error) {
//             return c.json({ error: 'Error adding user to group' }, 500)
//         }
//     },
// )
//
// // Remove user from group
// app.delete('/:id/remove-user/:userId', checkToken, isGroupOwner, async (c) => {
//     const id = c.req.param('id')
//     const userId = c.req.param('userId')
//
//     const user = await findUserByUserIdAndGroupId(userId, id)
//     if (!user) {
//         return c.json({ error: 'User does not belong to group' }, 400)
//     }
//
//     const result = await deleteUser(user.id)
//     // update auth user group if set
//     // const authUser = await findAuthUserByUserId(user.id)
//     // if (authUser?.defaultGroupId === id) {
//     //     await setDefaultGroupId(authUser.id, null)
//     // }
//
//     return c.json({ data: result, message: 'User removed from group' }, 201)
// })
//
// // leave group
// app.delete('/:id/leave', checkToken, isGroupParticipant, async (c) => {
//     const id = c.req.param('id')
//     const { userId } = await c.get('jwtPayload')
//
//     const user = await findUserByUserIdAndGroupId(userId, id)
//     if (!user) {
//         return c.json({ error: 'User does not belong to group' }, 400)
//     }
//
//     const result = await deleteUser(user.id)
//     // update auth user group if set
//     // const authUser = await findAuthUserByUserId(user.id)
//     // if (authUser?.defaultGroupId === id) {
//     //     await setDefaultGroupId(authUser.id, null)
//     // }
//
//     return c.json({ data: result, message: 'User removed from group' }, 201)
// })
//
// export default app
