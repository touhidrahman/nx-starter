import { count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { courtsTable } from '../../core/db/schema'
import { InsertCourt } from './courts.schema'

export class CourtsService {
    // Find all courts
    async findAllCourts() {
        const courts = await db
            .select()
            .from(courtsTable)
            .limit(100)

        return courts
    }

    // Find a specific court by ID
    async findCourtById(id: string) {
        return db.query.courtsTable.findFirst({
            where: eq(courtsTable.id, id),
        })
    }

    // Create a new court
    async createCourt(court: InsertCourt) {
        return db.insert(courtsTable).values(court).returning()
    }

    // Update an existing court by ID
    async updateCourt(
        id: string,
        court: Partial<InsertCourt>,
    ) {
        return db
            .update(courtsTable)
            .set(court)
            .where(eq(courtsTable.id, id))
            .returning()
    }

    // Delete a court by ID
    async deleteCourt(id: string) {
        return db
            .delete(courtsTable)
            .where(eq(courtsTable.id, id))
            .returning()
    }

    // Delete multiple courts by IDs
    async deleteCourts(ids: string[]) {
        try {
            for (const id of ids) {
                await db
                    .delete(courtsTable)
                    .where(eq(courtsTable.id, id))
            }
        } catch (error) {
            throw new Error('Failed to delete courts: ')
        }
    }

    // Check if a court exists by ID
    async courtExists(id: string) {
        const courtCount = await db
            .select({ value: count() })
            .from(courtsTable)
            .where(eq(courtsTable.id, id))

        return courtCount?.[0]?.value === 1
    }
}

export const courtsService = new CourtsService()
