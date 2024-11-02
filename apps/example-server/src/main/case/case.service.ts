import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { InsertCase } from './case.schema'

export class CaseService {
    // Find all cases by groupId
    async findCasesByGroupId(groupId: string) {
        const cases = await db
            .select()
            .from(casesTable)
            .where(eq(casesTable.groupId, groupId))
            .limit(100)

        return cases
    }

    // Find a specific case by ID
    async findCaseById(id: string) {
        return db.query.casesTable.findFirst({
            where: eq(casesTable.id, id),
        })
    }

    // Create a new case
    async createCase(caseItem: InsertCase) {
        return db.insert(casesTable).values(caseItem).returning()
    }

    // Update an existing case by ID
    async updateCase(id: string, caseItem: Partial<InsertCase>) {
        return db
            .update(casesTable)
            .set(caseItem)
            .where(eq(casesTable.id, id))
            .returning()
    }

    // Delete a case by ID
    async deleteCase(id: string) {
        return db.delete(casesTable).where(eq(casesTable.id, id)).returning()
    }

    // Delete multiple cases by IDs
    async deleteCases(ids: string[], groupId: string) {
        try {
            for (const id of ids) {
                await db
                    .delete(casesTable)
                    .where(
                        and(
                            eq(casesTable.id, id),
                            eq(casesTable.groupId, groupId),
                        ),
                    )
            }
        } catch (error) {
            throw new Error('Failed to delete cases: ')
        }
    }

    // Check if a case exists by ID
    async caseExists(id: string) {
        const caseCount = await db
            .select({ value: count() })
            .from(casesTable)
            .where(eq(casesTable.id, id))

        return caseCount?.[0]?.value === 1
    }
}

export const caseService = new CaseService()
