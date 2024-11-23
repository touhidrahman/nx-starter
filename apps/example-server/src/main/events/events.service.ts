import { getTableColumns, eq, and } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { eventsTable } from '../../core/db/schema'

export const getEventsList = async (groupId: string) => {
    const events = await db
        .select({ ...getTableColumns(eventsTable) })
        .from(eventsTable)
        .where(eq(eventsTable.groupId, groupId))
        .limit(100)
    return events
}

export const getAnEvent = async (id: string) => {
    const event = await db
        .select({ ...getTableColumns(eventsTable) })
        .from(eventsTable)
        .where(eq(eventsTable.id, id))
        .limit(1)

    return event
}

export const createEvent = async (data: any) => {
    const newEvent = await db.insert(eventsTable).values(data).returning()
    return newEvent
}

export const updateEvent = async (id: string, groupId: string, data: any) => {
    return db
        .update(eventsTable)
        .set(data)
        .where(and(eq(eventsTable.id, id), eq(eventsTable.groupId, groupId)))
        .returning()
}

export const deleteEvent = async (id: string) => {
    await db.delete(eventsTable).where(eq(eventsTable.id, id))
}

export const deleteManyEvent = async (id: string, groupId: string) => {
    await db
        .delete(eventsTable)
        .where(and(eq(eventsTable.id, id), eq(eventsTable.groupId, groupId)))
}
