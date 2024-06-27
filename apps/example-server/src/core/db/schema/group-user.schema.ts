import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'
import { groupsTable, roleEnum } from './group.schema'
import { usersTable } from './user.schema'

export const groupUserTable = pgTable(
    'group_users',
    {
        userId: integer('user_id')
            .references(() => usersTable.id, { onDelete: 'cascade' })
            .notNull(),
        groupId: integer('group_id')
            .references(() => groupsTable.id, { onDelete: 'cascade' })
            .notNull(),
        role: roleEnum('role').notNull().default('member'),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.groupId] }),
        }
    },
)
