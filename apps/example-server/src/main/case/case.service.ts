import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { InsertCase } from './case.schema'

// Retrieve all cases by group ID, limiting results to 100.
export const findCasesByGroupId = async (groupId: string) =>
    db
        .select()
        .from(casesTable)
        .where(eq(casesTable.groupId, groupId))
        .limit(100)

// Retrieve a specific case by ID.
export const findCaseById = async (id: string) =>
    db.query.casesTable.findFirst({
        where: eq(casesTable.id, id),
    })

// Insert a new case.
export const createCase = async (caseItem: InsertCase) =>
    db.insert(casesTable).values(caseItem).returning()

// Update an existing case by ID.
export const updateCase = async (id: string, caseItem: Partial<InsertCase>) =>
    db.update(casesTable).set(caseItem).where(eq(casesTable.id, id)).returning()

// Remove a case by ID.
export const deleteCase = async (id: string) =>
    db.delete(casesTable).where(eq(casesTable.id, id)).returning()

// Bulk delete cases by a list of IDs, restricted by group ID.
export const deleteCases = async (ids: string[], groupId: string) => {
    try {
        await Promise.all(
            ids.map((id) =>
                db
                    .delete(casesTable)
                    .where(
                        and(
                            eq(casesTable.id, id),
                            eq(casesTable.groupId, groupId),
                        ),
                    ),
            ),
        )
    } catch (error) {
        throw new Error('Failed to delete cases.')
    }
}

// Check existence of a case by ID.
export const caseExists = async (id: string) => {
    const caseCount = await db
        .select({ value: count() })
        .from(casesTable)
        .where(eq(casesTable.id, id))

    return caseCount?.[0]?.value === 1
}
