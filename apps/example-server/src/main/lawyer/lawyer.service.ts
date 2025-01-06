import { and, eq, getTableColumns, ilike, sql, SQL } from "drizzle-orm"
import { lawyerTable } from "../../core/db/schema"
import { db } from "../../core/db/db"
import { InsertLawyer } from "./lawyer.schema"


export const getAllLawyer = async (params: {
    search: string,
    page: number,
    size: number,
    orderBy?: string
}) => {
    const { search, page, size, orderBy } = params

    const conditions: SQL<unknown>[] = []

    if (search) {
        const searchTerm = `%${search}%`
        conditions.push(
            sql`(${ilike(lawyerTable.email, searchTerm)} OR ${ilike(lawyerTable.phoneNumber, searchTerm)} )`
        )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined
    const offset = (page - 1) * size

    const query = db
        .select({
            ...getTableColumns(lawyerTable),
        })
        .from(lawyerTable)
        .limit(size)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    if (orderBy) {
        const direction = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        query.orderBy(sql`${lawyerTable.createdAt} ${sql.raw(direction)}`)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql<number>`count(*)`,
        })
        .from(lawyerTable)

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

// find specific lawyer by id
export const findLawyerById = async (id: string) =>
    db.query.lawyerTable.findFirst({
        where: eq(lawyerTable.id, id),
    })

// Insert a new lawyer.
export const createLawyer = async (lawyerItem: InsertLawyer) =>
    await db.insert(lawyerTable).values(lawyerItem).returning()


// Update an existing lawyer by ID.
export const updateLawyer = async (id: string, caseItem: Partial<InsertLawyer>) =>
    db.update(lawyerTable).set(caseItem).where(eq(lawyerTable.id, id)).returning()

// Remove a lawyer by ID.
export const deleteLawyer = async (id: string) =>
    db.delete(lawyerTable).where(eq(lawyerTable.id, id)).returning()