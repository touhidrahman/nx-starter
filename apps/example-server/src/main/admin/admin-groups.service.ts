import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { groupsTable } from '../../core/db/schema'
import { InsertGroup } from './admin-groups.schema'

export class AdminGroupsService {
    // Find all groups with pagination
    async findAllGroups(page = 1, size = 10) {
        const offset = (page - 1) * size
        const groups = await db
            .select()
            .from(groupsTable)
            .limit(size)
            .offset(offset)

        return groups
    }

    // Find a specific group by ID
    async findGroupById(id: string) {
        return db.query.groupsTable.findFirst({
            where: eq(groupsTable.id, id),
        })
    }

    // Create a new group
    async createGroup(group: InsertGroup) {
        return db.insert(groupsTable).values(group).returning()
    }

    // Update an existing group by ID
    async updateGroup(id: string, group: Partial<InsertGroup>) {
        return db
            .update(groupsTable)
            .set(group)
            .where(eq(groupsTable.id, id))
            .returning()
    }

    // Delete a group by ID
    async deleteGroup(id: string) {
        return db.delete(groupsTable).where(eq(groupsTable.id, id)).returning()
    }

    // Delete multiple groups by IDs
    // Import Error type if you want to ensure type safety

    async deleteGroups(ids: string[]) {
        try {
            for (const id of ids) {
                await db.delete(groupsTable).where(eq(groupsTable.id, id))
            }
        } catch (error: unknown) {
            // Check if error is an instance of Error
            if (error instanceof Error) {
                throw new Error('Failed to delete groups: ' + error.message)
            } else {
                throw new Error(
                    'Failed to delete groups: Unknown error occurred',
                )
            }
        }
    }

    // Verify a group by ID
    async verifyGroup(id: string) {
        return db
            .update(groupsTable)
            .set({ verified: true })
            .where(eq(groupsTable.id, id))
            .returning()
    }

    // Check if a group exists by ID
    async groupExists(id: string) {
        const groupCount = await db
            .select({ value: count() })
            .from(groupsTable)
            .where(eq(groupsTable.id, id))

        return groupCount?.[0]?.value === 1
    }
}

export const adminGroupsService = new AdminGroupsService()
