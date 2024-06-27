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

export const roleEnum = pgEnum('role', ['guest', 'member', 'owner'])
export const groupTypeEnum = pgEnum('type', ['client', 'vendor'])

export const groupsTable = pgTable('groups', {
    id: serial('id').primaryKey(),
    type: groupTypeEnum('type').notNull(),
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

export type InsertGroup = typeof groupsTable.$inferInsert
export type SelectGroup = typeof groupsTable.$inferSelect

export const zInsertGroup = createInsertSchema(groupsTable, {
    email: (schema) => schema.email.email(),
    verifiedOn: z.coerce.date(),
})
export const zSelectGroup = createSelectSchema(groupsTable)
export const zUpdateGroup = zInsertGroup.omit({
    // public facing API cannot update these fields
    verified: true,
    verifiedOn: true,
})
