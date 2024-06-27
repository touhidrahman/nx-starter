import {
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
import { z } from 'zod'

export const userTypeEnum = pgEnum('type', ['user', 'moderator', 'admin'])

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    lastLogin: timestamp('last_login'),
    type: userTypeEnum('type').notNull().default('user'),
    verified: boolean('is_verified').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const zInsertUser = createInsertSchema(usersTable, {
    email: (schema) => schema.email.email(),
})
export const zSelectUser = createSelectSchema(usersTable)
export const zUpdateUser = zInsertUser.omit({
    email: true,
    password: true,
    id: true,
    type: true,
    verified: true,
})
