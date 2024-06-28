import { relations } from 'drizzle-orm'
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

export const userTypeEnum = pgEnum('userType', ['user', 'moderator', 'admin'])

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

export const usersRelations = relations(usersTable, ({ many }) => ({
    usersToGroups: many(groupToUsersTable),
}))

export const roleEnum = pgEnum('role', ['guest', 'member', 'owner'])
export const groupTypeEnum = pgEnum('groupType', ['client', 'vendor'])

export const groupsTable = pgTable('groups', {
    id: serial('id').primaryKey(),
    type: groupTypeEnum('type').notNull().default('client'),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    city: text('city'),
    country: text('country'),
    postCode: text('post_code'),
    verified: boolean('is_verified').notNull().default(false),
    verifiedOn: timestamp('verified_on'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export const groupsRelations = relations(groupsTable, ({ many }) => ({
    usersToGroups: many(groupToUsersTable),
}))

export const groupToUsersTable = pgTable(
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

export const usersToGroupsRelations = relations(
    groupToUsersTable,
    ({ one }) => ({
        group: one(groupsTable, {
            fields: [groupToUsersTable.groupId],
            references: [groupsTable.id],
        }),
        user: one(usersTable, {
            fields: [groupToUsersTable.userId],
            references: [usersTable.id],
        }),
    }),
)

export const subscriptionTable = pgTable('subscription', {
    id: serial('id').primaryKey(),
    currentPlan: text('current_plan').notNull(),
    isTrialing: boolean('is_trialing').notNull().default(true),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    autorenewal: boolean('autorenewal').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})
