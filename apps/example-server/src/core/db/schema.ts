import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

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
