import { db } from '../../core/db/db'
import { documentsTable, storageTable } from '../../core/db/schema'
import { and, eq, getTableColumns, ilike, SQL, sql } from 'drizzle-orm'
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

export const getAllDocuments = async (params: {
    search: string
    entityName: string
    groupId: any
    limit: number
    entityId: string
    page: number
}) => {
    const { entityName, entityId, groupId, search, page, limit } = params

    const conditions: SQL<unknown>[] = []
    if (entityName) {
        conditions.push(eq(storageTable.entityName, entityName))
    }
    if (entityId) {
        conditions.push(eq(storageTable.entityId, entityId))
    }
    if (groupId) {
        conditions.push(eq(storageTable.entityId, groupId))
    }

    if (search) {
        conditions.push(ilike(storageTable.filename, `%${search}%`))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const offset = (page - 1) * limit

    const query = db
        .select({
            ...getTableColumns(documentsTable),
        })
        .from(documentsTable)
        .limit(limit)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql`count(*)`.as<number>(),
        })
        .from(storageTable)

    if (whereClause) {
        totalCountQuery.where(whereClause)
    }

    const totalCountResult = await totalCountQuery
    const totalCount = totalCountResult[0]?.count || 0

    return {
        data: results,
        meta: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        },
    }
}
