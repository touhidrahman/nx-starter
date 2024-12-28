import {
    eq,
    and,
    count,
    inArray,
    SQL,
    sql,
    ilike,
    getTableColumns,
} from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, groupsTable, usersTable } from '../../core/db/schema'
import { GroupDto } from './group.schema'

// Retrieve the default group for a specific authenticated user.
export const getDefaultGroup = async (authUserId: string) => {
    const results = await db
        .select()
        .from(groupsTable)
        .innerJoin(
            authUsersTable,
            eq(groupsTable.id, authUsersTable.defaultGroupId),
        )
        .where(and(eq(authUsersTable.id, authUserId)))
        .limit(1)

    return results?.[0] ?? null
}

export const getAllGroups = async (params: {
    search: string
    page: number
    size: number
    orderBy?: string
    status: 'active' | 'inactive' | 'pending'
    type: 'client' | 'vendor'
}) => {
    const { status, type, search, page, size, orderBy } = params

    const conditions: SQL<unknown>[] = []

    if (status) {
        conditions.push(eq(groupsTable.status, status))
    }
    if (type) {
        conditions.push(eq(groupsTable.type, type))
    }

    if (search) {
        const searchTerm = `%${search}%`
        conditions.push(
            sql`(${ilike(groupsTable.name, searchTerm)} OR ${ilike(groupsTable.email, searchTerm)})`,
        )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const offset = (page - 1) * size

    const query = db
        .select({
            ...getTableColumns(groupsTable),
        })
        .from(groupsTable)
        .limit(size)
        .offset(offset)

    if (whereClause) {
        query.where(whereClause)
    }

    if (orderBy) {
        const direction = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        query.orderBy(sql`${groupsTable.createdAt} ${sql.raw(direction)}`)
    }

    const results = await query

    const totalCountQuery = db
        .select({
            count: sql`count(*)`.as<number>(),
        })
        .from(groupsTable)

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

// Retrieve a specific group by its ID.
export const findGroupById = async (id: string) => {
    const results = await db
        .select()
        .from(groupsTable)
        .where(and(eq(groupsTable.id, id)))
        .limit(1)

    return results?.[0] ?? null
}

// Retrieve all groups associated with a specific authenticated user.
export const findGroupsByAuthUserId = async (authUserId: string) => {
    const result = await db.query.usersTable.findMany({
        where: eq(usersTable.authUserId, authUserId),
        with: { group: true },
    })

    return result.map((u) => u.group)
}

// Check if a user is the owner of a group.
export const isOwner = async (userId: string, groupId: string) => {
    const results = await db
        .select({ count: count() })
        .from(groupsTable)
        .where(
            and(eq(groupsTable.id, groupId), eq(groupsTable.ownerId, userId)),
        )

    return results?.[0].count === 1
}

// Check if a user is a participant in a group.
export const isParticipant = async (userId: string, groupId: string) => {
    const results = await db
        .select({ count: count() })
        .from(usersTable)
        .where(and(eq(usersTable.groupId, groupId), eq(usersTable.id, userId)))

    return results?.[0].count === 1
}

// Insert a new group.
export const createGroup = async (group: GroupDto) =>
    db.insert(groupsTable).values(group).returning()

// Update an existing group by ID.
export const updateGroup = async (id: string, group: Partial<GroupDto>) =>
    db.update(groupsTable).set(group).where(eq(groupsTable.id, id)).returning()

// Delete a group by ID.
export const deleteGroup = async (id: string) =>
    db.delete(groupsTable).where(eq(groupsTable.id, id)).returning()

// Verify a group by setting its verified status to true.
export const verifyGroup = async (id: string) =>
    db
        .update(groupsTable)
        .set({ verified: true, verifiedOn: new Date() })
        .where(eq(groupsTable.id, id))
        .returning()

// Bulk delete multiple groups by their IDs.
export const deleteManyGroups = async (ids: string[]) =>
    db.delete(groupsTable).where(inArray(groupsTable.id, ids)).returning()
