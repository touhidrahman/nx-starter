import { and, count, eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { appointmentsTable } from '../../core/db/schema'
import { InsertAppointment } from './appointments.schema'

// Retrieve all appointments by group ID, limiting results to 100.
export const findAppointmentsByGroupId = async (params: {
    groupId: string
    search: string
    page: number
    size: number
    orderBy?: string
}) => {
    const { groupId, search, page, size, orderBy } = params

    const conditions: SQL<unknown>[] = []

    if (groupId) {
        conditions.push(eq(appointmentsTable.groupId, groupId))
    }

    if (search) {
        const searchTerm = `%${search}%`
        conditions.push(
            sql`(${ilike(appointmentsTable.description, searchTerm)} OR ${ilike(appointmentsTable.notesForVendor, searchTerm)})`,
        )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const offset = (page - 1) * size

    const query = db
        .select({
            ...getTableColumns(appointmentsTable),
        })
        .from(appointmentsTable)
        .limit(size)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    if (orderBy) {
        const direction = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        query.orderBy(sql`${appointmentsTable.createdAt} ${sql.raw(direction)}`)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql`count(*)`.as<number>(),
        })
        .from(appointmentsTable)

    if (whereClause) {
        totalCountQuery.where(whereClause)
    }

    const totalCountResult = await totalCountQuery
    const totalCount = totalCountResult[0]?.count || 0

    return {
        data: results,
        meta: {
            page,
            size,
            totalCount,
            totalPages: Math.ceil(totalCount / size),
        },
    }
}

// Retrieve a specific appointment by ID.
export const findAppointmentById = async (id: string) =>
    db.query.appointmentsTable.findFirst({
        where: eq(appointmentsTable.id, id),
    })

// Insert a new appointment.
export const createAppointment = async (appointment: InsertAppointment) =>
    db.insert(appointmentsTable).values(appointment).returning()

// Update an existing appointment by ID.
export const updateAppointment = async (
    id: string,
    appointment: Partial<InsertAppointment>,
) =>
    db
        .update(appointmentsTable)
        .set(appointment)
        .where(eq(appointmentsTable.id, id))
        .returning()

// Remove an appointment by ID.
export const deleteAppointment = async (id: string) =>
    db.delete(appointmentsTable).where(eq(appointmentsTable.id, id)).returning()

// Bulk delete appointments by a list of IDs, restricted by group ID.
export const deleteAppointments = async (ids: string[], groupId: string) => {
    try {
        await Promise.all(
            ids.map((id) =>
                db
                    .delete(appointmentsTable)
                    .where(
                        and(
                            eq(appointmentsTable.id, id),
                            eq(appointmentsTable.groupId, groupId),
                        ),
                    ),
            ),
        )
    } catch (error) {
        throw new Error('Failed to delete appointments.')
    }
}

// Check existence of an appointment by ID.
export const appointmentExists = async (id: string) => {
    const appointmentCount = await db
        .select({ value: count() })
        .from(appointmentsTable)
        .where(eq(appointmentsTable.id, id))

    return appointmentCount?.[0]?.value === 1
}
