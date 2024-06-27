import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

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
