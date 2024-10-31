import { db } from '../../core/db/db'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { tasksTable } from '../../core/db/schema'
import { InsertTask } from './tasks.schema'

export const getAllTasks = async (groupId: string) => {
    const reults = await db
        .select({ ...getTableColumns(tasksTable) })
        .from(tasksTable)
        .where(eq(tasksTable.groupId, groupId))
        .limit(100)
    return reults
}

export const getTaskById = async (id: string) => {
    const reults = await db
        .select({ ...getTableColumns(tasksTable) })
        .from(tasksTable)
        .where(eq(tasksTable.id, id))
        .limit(1)
    return reults
}

export const createTask = async (data: InsertTask) => {
    const reults = await db.insert(tasksTable).values(data).returning()
    return reults
}

export const updateTask = async (
    data: InsertTask,
    id: string,
    groupId: string,
) => {
    const reults = await db
        .update(tasksTable)
        .set(data)
        .where(and(eq(tasksTable.id, id), eq(tasksTable.groupId, groupId)))
        .returning()
    return reults
}

export const deleteTask = async (taskId: string) => {
    const reults = await db.delete(tasksTable).where(eq(tasksTable.id, taskId))
    return reults
}

export const deleteAllTask = async (taskId: string, groupId: string) => {
    const reults = await db
        .delete(tasksTable)
        .where(and(eq(tasksTable.id, taskId), eq(tasksTable.groupId, groupId)))
    return reults
}
