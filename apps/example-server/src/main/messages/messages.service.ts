import { db } from '../../core/db/db'
import { messagesTable } from '../../core/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export const listAll = async (limit: number = 100) => {
    return db
        .select({ ...getTableColumns(messagesTable) })
        .from(messagesTable)
        .limit(limit)
}

export const findById = async (id: string) => {
    const result = await db
        .select({ ...getTableColumns(messagesTable) })
        .from(messagesTable)
        .where(eq(messagesTable.id, id))
        .limit(1)

    return result[0] || null
}

export const create = async (data: any) => {
    return db.insert(messagesTable).values(data).returning()
}

export const update = async (id: string, data: any) => {
    return db
        .update(messagesTable)
        .set(data)
        .where(eq(messagesTable.id, id))
        .returning()
}

export const deleteMessage = async (id: string) => {
    return db.delete(messagesTable).where(eq(messagesTable.id, id))
}
