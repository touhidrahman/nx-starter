import { eq, getTableColumns } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { storageTable } from '../../core/db/schema'

export const getStorageItemById = async (id: string) => {
    const [result] = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(eq(storageTable.id, id))
        .limit(1)
    return result ? result : null
}
