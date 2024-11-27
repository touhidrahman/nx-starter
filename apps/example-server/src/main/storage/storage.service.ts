import { eq, getTableColumns } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { storageTable } from '../../core/db/schema'
import { getFileType } from './storage.util'

export const getStorageItemById = async (id: string) => {
    const [result] = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(eq(storageTable.id, id))
        .limit(1)
    return result ? result : null
}

export async function createStorageRecord(data: {
    file: File,
    url: string,
    entityName: string,
    entityId: string,
    uploadedBy: string,
}) {
    return db
        .insert(storageTable)
        .values({
            filename: data.file.name,
            url: data.url,
            type: getFileType(data.file),
            size: data.file.size,
            extension: data.file.name.split('.').pop(),
            entityId: data.entityId,
            entityName: data.entityName,
            uploadedBy: data.uploadedBy,
        })
        .returning()
}
