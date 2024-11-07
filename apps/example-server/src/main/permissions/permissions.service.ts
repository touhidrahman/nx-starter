import { db } from '../../core/db/db'
import { permissionsTable } from '../../core/db/schema'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { SelectPermission } from './permissions.schema'

export const listAll = async (limit: number = 100) => {
    return db
        .select({ ...getTableColumns(permissionsTable) })
        .from(permissionsTable)
        .limit(limit)
}

export const create = async (permissionData: any) => {
    return db.insert(permissionsTable).values(permissionData).returning()
}

export const deleteMany = async (permission: any) => {
    return db
        .delete(permissionsTable)
        .where(
            and(
                eq(permissionsTable.groupId, permission.groupId),
                eq(permissionsTable.role as any, permission.role),
                eq(permissionsTable.area, permission.area),
            ),
        )
}
;``
