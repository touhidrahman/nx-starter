// import { zValidator } from '@hono/zod-validator'
// import { eq, getTableColumns } from 'drizzle-orm'
// import { Hono } from 'hono'
// import { jwt } from 'hono/jwt'
// import { db } from '../../core/db/db'
// import { storageTable } from '../../core/db/schema'
// import { zDeleteStorage, zUpdateStorage } from './storage.schema'
// import { createRouter } from '../../core/create-app'
// import {
//     getStorageItemHandler,
//     getStorageItemRoute,
// } from './routes/get-storage-item'

// const app = new Hono()

// const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

// const authMiddleware = jwt({ secret })

// // GET /storage - list all
// app.get('', authMiddleware, async (c) => {
//     const storage = await db
//         .select({ ...getTableColumns(storageTable) })
//         .from(storageTable)
//         .limit(100)

//     if (!storage) c.json({ data: {}, message: 'No file found' })

//     return c.json({ data: storage, message: 'Storage list' })
// })

// // PATCH /storage/:id - update
// app.patch(
//     '/:id',
//     zValidator('json', zUpdateStorage),
//     authMiddleware,
//     async (c) => {
//         const id = parseInt(c.req.param('id'), 10)
//         const body = await c.req.parseBody()
//         const payload = c.get('jwtPayload')
//         const file: string | File = body['file'] as File // File | string

//         const storage = await db
//             .select({ ...getTableColumns(storageTable) })
//             .from(storageTable)
//             .where(eq(storageTable.id, id))
//             .limit(1)
//         let fileUrl = ''

//         if (file) {
//             await deleteFile(storage[0].url ?? '')
//             fileUrl = await uploadFile(file)
//         }
//         console.log(storage, fileUrl)
//         const entityId = body.entityId as string
//         const entityName = body.entityName as string

//         const data = {
//             filename: file ? file.name : storage[0].filename,
//             url: fileUrl ?? storage[0].url,
//             extension: file ? file.type : storage[0].extension,
//             uploadedBy: payload.sub ?? storage[0].uploadedBy,
//             entityId: entityId ?? storage[0].entityId,
//             entityName: entityName ?? storage[0].entityName,
//         }

//         try {
//             const updatedStorage = await db
//                 .update(storageTable)
//                 .set(data)
//                 .where(eq(storageTable.id, id))
//                 .returning()

//             return c.json({ data: updatedStorage, message: 'Storage updated' })
//         } catch (error) {
//             return c.json({ data: {}, message: 'Storage update failed!' })
//         }
//     },
// )

// // DELETE /storage/:id - delete
// app.delete('/:id', authMiddleware, async (c) => {
//     const id = parseInt(c.req.param('id'), 10)

//     const storage = await db
//         .select({ ...getTableColumns(storageTable) })
//         .from(storageTable)
//         .where(eq(storageTable.id, id))
//         .limit(1)

//     try {
//         await deleteFile(storage[0].url ?? '')
//         await db.delete(storageTable).where(eq(storageTable.id, id))

//         return c.json({ message: 'Storage deleted' })
//     } catch (e) {
//         return c.json({ message: 'Storage deleted unsuccessful!' })
//     }
// })

// // DELETE /storage - delete many
// app.delete(
//     '',
//     zValidator('json', zDeleteStorage),
//     authMiddleware,
//     async (c) => {
//         const body = c.req.valid('json')

//         for (const storageId of body.storageIds) {
//             const storage = await db
//                 .select({ ...getTableColumns(storageTable) })
//                 .from(storageTable)
//                 .where(eq(storageTable.id, storageId))
//                 .limit(1)
//             await deleteFile(storage[0].url ?? '')
//             await db.delete(storageTable).where(eq(storageTable.id, storageId))
//         }

//         return c.json({ message: 'Storage entries deleted' })
//     },
// )

// export default app
