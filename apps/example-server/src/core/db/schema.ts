import dayjs from 'dayjs'
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

// Define a schema for a date-time string
const dateTimeStringSchema = z.string().refine(
    (val) => {
        // Check if the string is a valid date-time format
        return !isNaN(Date.parse(val))
    },
    {
        message: 'Invalid date-time string',
    },
)

export const idsSchema = z.object({
    ids: z.array(z.coerce.number()),
})

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

export const insertVendorSchema = createInsertSchema(vendorsTable, {
    email: (schema) => schema.email.email(),
    nextRenewalDate: z.coerce.date(),
    nextBillingDate: z.coerce.date(),
    verifiedOn: z.coerce.date(),
})
export const selectVendorSchema = createSelectSchema(vendorsTable)
export const updateVendorSchema = insertVendorSchema.omit({
    // public facing API cannot update these fields
    isTrialing: true,
    nextBillingDate: true,
    nextRenewalDate: true,
    verified: true,
    verifiedOn: true,
})
