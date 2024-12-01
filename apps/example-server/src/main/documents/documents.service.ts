import { db } from '../../core/db/db'
import { documentsTable, storageTable } from '../../core/db/schema'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getFileType } from '../../core/utils/file.util'
import { InsertDocument } from './documents.schema'

export const listDocumentsByGroup = async (groupId: string) => {
    return db
        .select({ ...getTableColumns(documentsTable) })
        .from(documentsTable)
        .where(eq(documentsTable.groupId, groupId))
        .limit(100)
}

export const findDocumentById = async (id: string) => {
    const document = await db
        .select({ ...getTableColumns(documentsTable) })
        .from(documentsTable)
        .where(eq(documentsTable.id, id))
        .limit(1)

    return document[0] || null
}

// export const findDocumentByIdAndOwnership = async (
//     id: string,
//     groupId: string,
//     userId?: string,
// ) => {
//     const where = userId
//         ? and(
//               eq(documentsTable.id, id),
//               eq(documentsTable.groupId, groupId),
//               eq(documentsTable.userId, userId),
//           )
//         : and(eq(documentsTable.id, id), eq(documentsTable.groupId, groupId))

//     const document = await db
//         .select({ ...getTableColumns(documentsTable) })
//         .from(documentsTable)
//         .where(where)
//         .limit(1)

//     return document[0] || null
// }

export async function createDocument(data: {
    file: File
    filename?: string
    url: string
    entityName?: string
    entityId?: string
    userId: string
    groupId: string
    folder?: string
    description?: string
}) {
    return db
        .insert(documentsTable)
        .values({
            filename: data.filename ?? data.file.name,
            url: data.url,
            type: getFileType(data.file),
            mimetype: data.file.type,
            extension: data.file.name.split('.').pop(),
            size: data.file.size,
            entityId: data.entityId ?? '',
            entityName: data.entityName ?? '',
            userId: data.userId,
            groupId: data.groupId,
            folder: data.folder ?? '',
            description: data.folder ?? '',
        } as any) // TODO: remove any
        .returning()
}

export const updateDocument = async (
    id: string,
    groupId: string,
    data: Partial<InsertDocument>,
) => {
    return db
        .update(documentsTable)
        .set(data)
        .where(
            and(eq(documentsTable.id, id), eq(documentsTable.groupId, groupId)),
        )
        .returning()
}

export const deleteDocument = async (id: string) => {
    return db.delete(documentsTable).where(eq(documentsTable.id, id))
}

export const deleteAll = (id: string, groupId: string) => {
    return db
        .delete(documentsTable)
        .where(
            and(eq(documentsTable.id, id), eq(documentsTable.groupId, groupId)),
        )
}

export const getFilesByEntityNameAndEntityId = async (
    entityId: string,
    entityName: string,
) => {
    return db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(
            and(
                eq(storageTable.entityName, entityName),
                eq(storageTable.entityId, entityId),
            ),
        )
}

export const getFilesByEntityName = async (entityName: string) => {
    const results = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(eq(storageTable.entityName, entityName))
    return results ? results : null
}

export const getFilesByGroupId = async (groupId: string) => {
    const results = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(eq(storageTable.entityId, groupId))
    return results ? results : null
}
