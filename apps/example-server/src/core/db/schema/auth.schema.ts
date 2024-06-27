import {
    AnyPgColumn,
    boolean,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userTypeEnum = pgEnum('type', ['user', 'admin', 'superadmin'])
export const roleEnum = pgEnum('role', [
    'client',
    'vendor_member',
    'vendor_owner',
])

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    lastLogin: timestamp('last_login'),
    type: userTypeEnum('type').notNull().default('user'),
    role: roleEnum('role').notNull().default('client'),
    verified: boolean('is_verified').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const insertUserSchema = createInsertSchema(usersTable, {
    email: (schema) => schema.email.email(),
})
export const selectUserSchema = createSelectSchema(usersTable)
export const updateUserSchema = insertUserSchema.omit({
    email: true,
    password: true,
    id: true,
    role: true,
    type: true,
    verified: true,
})

export const rolesTable = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    parentRoleId: integer('parent_role_id').references(
        (): AnyPgColumn => rolesTable.id,
    ),
})

export const userRolesTable = pgTable(
    'user_roles',
    {
        userId: integer('user_id')
            .references(() => usersTable.id, { onDelete: 'cascade' })
            .notNull(),
        roleId: integer('role_id')
            .references(() => rolesTable.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.roleId] }),
        }
    },
)

export const permissionsTable = pgTable('permissions', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
})

export const rolePermissionsTable = pgTable(
    'role_permissions',
    {
        roleId: integer('role_id')
            .references(() => rolesTable.id, { onDelete: 'cascade' })
            .notNull(),
        permissionId: integer('permission_id')
            .references(() => permissionsTable.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
        }
    },
)
