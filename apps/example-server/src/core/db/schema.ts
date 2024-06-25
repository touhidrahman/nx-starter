import {
    boolean,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

//////////////////////////////////////////////////////
//                     USER                         //
//////////////////////////////////////////////////////

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

export const insertUserSchema = createInsertSchema(usersTable)
export const selectUserSchema = createSelectSchema(usersTable)

//////////////////////////////////////////////////////
//                   VENDOR                         //
//////////////////////////////////////////////////////

export const vendorsTable = pgTable('vendors', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    city: text('city'),
    country: text('country'),
    postCode: text('post_code'),
    verified: boolean('is_verified').notNull().default(false),
    verifiedOn: timestamp('verified_on'),
    isTrialing: boolean('is_trialing').notNull().default(true),
    nextBillingDate: timestamp('next_billing_date'),
    nextRenewalDate: timestamp('next_renewal_date'),
    subscription: text('subscription'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export type InsertVendor = typeof vendorsTable.$inferInsert
export type SelectVendor = typeof vendorsTable.$inferSelect
