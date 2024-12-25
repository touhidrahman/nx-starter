import { and, count, eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { InsertCase } from './case.schema'

export const getAllCasesByGroupId = async (params: {
    groupId: string
    search: string
    page: number
    size: number
    orderBy?: string
}) => {
    const { groupId, search, page, size, orderBy } = params

    const conditions: SQL<unknown>[] = []

    if (groupId) {
        conditions.push(eq(casesTable.groupId, groupId))
    }

    if (search) {
        const searchTerm = `%${search}%`
        conditions.push(
            sql`(${ilike(casesTable.name, searchTerm)} OR ${ilike(casesTable.court, searchTerm)})`,
        )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const offset = (page - 1) * size

    const query = db
        .select({
            ...getTableColumns(casesTable),
        })
        .from(casesTable)
        .limit(size)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    if (orderBy) {
        const direction = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        query.orderBy(sql`${casesTable.createdAt} ${sql.raw(direction)}`)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql`count(*)`.as<number>(),
        })
        .from(casesTable)

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

// Retrieve a specific case by ID.
export const findCaseById = async (id: string) =>
    db.query.casesTable.findFirst({
        where: eq(casesTable.id, id),
    })

// Retrieve a specific case by Number
export const findCaseByNumber = async (number: string) =>
    await db
        .select({ ...getTableColumns(casesTable) })
        .from(casesTable)
        .where(eq(casesTable.number, number))

// Insert a new case.
export const createCase = async (caseItem: InsertCase) =>
    await db.insert(casesTable).values(caseItem).returning()

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
