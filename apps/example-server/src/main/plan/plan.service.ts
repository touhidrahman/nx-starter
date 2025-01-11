import { and, eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { pricingPlanTable } from '../../core/db/schema'
import { db } from '../../core/db/db'
import { InsertPlan } from './plan.schema'

export const getAllPlans = async (params: {
    search: string
    page: number
    size: number
    orderBy?: string
}) => {
    const { search, page, size, orderBy } = params

    const conditions: SQL<unknown>[] = []

    if (search) {
        const searchTerm = `%${search}%`
        conditions.push(
            sql`(${ilike(pricingPlanTable.name, searchTerm)} OR ${ilike(pricingPlanTable.tier, searchTerm)} )`,
        )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined
    const offset = (page - 1) * size

    const query = db
        .select({
            ...getTableColumns(pricingPlanTable),
        })
        .from(pricingPlanTable)
        .limit(size)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    if (orderBy) {
        const direction = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        query.orderBy(sql`${pricingPlanTable.createdAt} ${sql.raw(direction)}`)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql<number>`count(*)`,
        })
        .from(pricingPlanTable)

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

// find specific plan by id
export const findPlanById = async (id: string) =>
    db.query.pricingPlanTable.findFirst({
        where: eq(pricingPlanTable.id, id),
    })

// Insert a new plan.
export const createPlan = async (planItem: InsertPlan) =>
    await db.insert(pricingPlanTable).values(planItem).returning()

// Update an existing plan by ID.
export const updatePlan = async (id: string, planItem: Partial<InsertPlan>) =>
    db
        .update(pricingPlanTable)
        .set(planItem)
        .where(eq(pricingPlanTable.id, id))
        .returning()

// Remove a plan by ID.
export const deletePlan = async (id: string) =>
    db.delete(pricingPlanTable).where(eq(pricingPlanTable.id, id)).returning()