import { db } from '../../core/db/db'
import { documentSharingTable } from '../../core/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export const listAll = async (limit: number = 100) => {
    return db
        .select({ ...getTableColumns(documentSharingTable) })
        .from(documentSharingTable)
        .limit(limit)
}

export const findById = async (id: string) => {
    const result = await db
        .select({ ...getTableColumns(documentSharingTable) })
        .from(documentSharingTable)
        .where(eq(documentSharingTable.id, id))
        .limit(1)

    return result[0] || null
}

export const create = async (data: any) => {
    return db.insert(documentSharingTable).values(data).returning()
}

export const update = async (id: string, data: any) => {
    return db
        .update(documentSharingTable)
        .set(data)
        .where(eq(documentSharingTable.id, id))
        .returning()
}

export const deleteSharing = async (id: string) => {
    return db
        .delete(documentSharingTable)
        .where(eq(documentSharingTable.id, id))
}
