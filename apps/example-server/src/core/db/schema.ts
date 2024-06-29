import { relations } from 'drizzle-orm'
import {
    boolean,
    foreignKey,
    index,
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
    usersToGroups: many(groupsToUsersTable),
}))

export const groupTypeEnum = pgEnum('groupType', ['client', 'vendor'])

export const rolesTable = pgTable('roles', {
    id: serial('id').primaryKey(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    name: text('name').notNull(),
})

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
    usersToGroups: many(groupsToUsersTable),
}))

export const groupsToUsersTable = pgTable(
    'groups_to_users',
    {
        userId: integer('user_id')
            .references(() => usersTable.id, { onDelete: 'cascade' })
            .notNull(),
        groupId: integer('group_id')
            .references(() => groupsTable.id, { onDelete: 'cascade' })
            .notNull(),
        roleId: integer('role_id').references(() => rolesTable.id),
        isDefault: boolean('is_default').notNull().default(false),
        isOwner: boolean('is_owner').notNull().default(false),
    },
    (table) => {
        return {
            // one user can be in a group only once
            pk: primaryKey({ columns: [table.userId, table.groupId] }),
        }
    },
)

export const usersToGroupsRelations = relations(
    groupsToUsersTable,
    ({ one }) => ({
        group: one(groupsTable, {
            fields: [groupsToUsersTable.groupId],
            references: [groupsTable.id],
        }),
        user: one(usersTable, {
            fields: [groupsToUsersTable.userId],
            references: [usersTable.id],
        }),
    }),
)

export const permissionsTable = pgTable(
    'permissions',
    {
        groupId: integer('group_id')
            .references(() => groupsTable.id)
            .notNull(),
        roleId: integer('role_id')
            .references(() => rolesTable.id)
            .notNull(),
        area: text('area').notNull(),
        access: integer('access').notNull().default(1), // refer to README.md for access levels
    },
    (table) => {
        return {
            pk: primaryKey({
                columns: [table.groupId, table.roleId, table.area],
            }),
        }
    },
)

// to keep a list of areas/resources/entities in the application to attach permissions to. Usually the table names
export const applicationAreasTable = pgTable('application_areas', {
    id: serial('id').primaryKey(),
    area: text('area').notNull(),
    description: text('description'),
})

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
