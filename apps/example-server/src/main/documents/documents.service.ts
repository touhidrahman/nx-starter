// src/services/document.service.ts

import { db } from '../../core/db/db'
import { documentsTable } from '../../core/db/schema'
import { and, eq, getTableColumns } from 'drizzle-orm'

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

export const createDocument = async (data: any) => {
    return db.insert(documentsTable).values(data).returning()
}

export const updateDocument = async (
    id: string,
    groupId: string,
    data: any,
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
