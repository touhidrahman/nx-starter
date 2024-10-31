import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { appointmentsTable } from '../../core/db/schema'
import { InsertAppointment } from './appointments.schema'

export class AppointmentsService {
    // Find all appointments by groupId
    async findAppointmentsByGroupId(groupId: string) {
        const appointments = await db
            .select()
            .from(appointmentsTable)
            .where(eq(appointmentsTable.groupId, groupId))
            .limit(100)

        return appointments
    }

    // Find a specific appointment by ID
    async findAppointmentById(id: string) {
        return db.query.appointmentsTable.findFirst({
            where: eq(appointmentsTable.id, id),
        })
    }

    // Create a new appointment
    async createAppointment(appointment: InsertAppointment) {
        return db.insert(appointmentsTable).values(appointment).returning()
    }

    // Update an existing appointment by ID
    async updateAppointment(
        id: string,
        appointment: Partial<InsertAppointment>,
    ) {
        return db
            .update(appointmentsTable)
            .set(appointment)
            .where(eq(appointmentsTable.id, id))
            .returning()
    }

    // Delete an appointment by ID
    async deleteAppointment(id: string) {
        return db
            .delete(appointmentsTable)
            .where(eq(appointmentsTable.id, id))
            .returning()
    }

    // Delete multiple appointments by IDs
    async deleteAppointments(ids: string[], groupId: string) {
        try {
            for (const id of ids) {
                await db
                    .delete(appointmentsTable)
                    .where(
                        and(
                            eq(appointmentsTable.id, id),
                            eq(appointmentsTable.groupId, groupId),
                        ),
                    )
            }
        } catch (error) {
            throw new Error('Failed to delete appointments: ')
        }
    }

    // Check if an appointment exists by ID
    async appointmentExists(id: string) {
        const appointmentCount = await db
            .select({ value: count() })
            .from(appointmentsTable)
            .where(eq(appointmentsTable.id, id))

        return appointmentCount?.[0]?.value === 1
    }
}

export const appointmentService = new AppointmentsService()
