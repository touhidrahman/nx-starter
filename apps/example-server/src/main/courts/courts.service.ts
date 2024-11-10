import { count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { courtsTable } from '../../core/db/schema'
import { InsertCourt } from './courts.schema'

// Retrieve all courts, limiting results to 100.
export const findAllCourts = async () =>
    db.select().from(courtsTable).limit(100)

// Retrieve a specific court by ID.
export const findCourtById = async (id: string) =>
    db.query.courtsTable.findFirst({
        where: eq(courtsTable.id, id),
    })

// Insert a new court.
export const createCourt = async (court: InsertCourt) =>
    db.insert(courtsTable).values(court).returning()

// Update an existing court by ID.
export const updateCourt = async (id: string, court: Partial<InsertCourt>) =>
    db.update(courtsTable).set(court).where(eq(courtsTable.id, id)).returning()

// Remove a court by ID.
export const deleteCourt = async (id: string) =>
    db.delete(courtsTable).where(eq(courtsTable.id, id)).returning()

// Bulk delete courts by a list of IDs.
export const deleteCourts = async (ids: string[]) => {
    try {
        await Promise.all(
            ids.map((id) =>
                db.delete(courtsTable).where(eq(courtsTable.id, id)),
            ),
        )
    } catch (error) {
        throw new Error('Failed to delete courts.')
    }
}

// Check existence of a court by ID.
export const courtExists = async (id: string) => {
    const courtCount = await db
        .select({ value: count() })
        .from(courtsTable)
        .where(eq(courtsTable.id, id))

    return courtCount?.[0]?.value === 1
}
