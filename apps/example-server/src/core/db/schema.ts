import { messages } from '@electric-sql/pglite'
import { relations } from 'drizzle-orm'
import {
    boolean,
    date,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

export const userLevelEnum = pgEnum('userLevel', ['user', 'moderator', 'admin'])
export const userRoleEnum = pgEnum('userRole', ['owner', 'manager', 'member'])
export const userStatusEnum = pgEnum('userStatus', [
    'active',
    'inactive',
    'banned',
])

/**
 * AuthUsers Table is used for logging in and authentication in the system
 */
export const authUsersTable = pgTable('auth_users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    phone: text('phone'),
    lastLogin: timestamp('last_login', { withTimezone: true }),
    level: userLevelEnum('level').notNull().default('user'),
    status: userStatusEnum('status').notNull().default('active'),
    verified: boolean('is_verified').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

/**
 * Users Table is used for Vendor & Client Users which are linked to AuthUsers
 */
export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email'),
    phone: text('phone'),
    coverPhoto: text('cover_photo'),
    profilePhoto: text('profile_photo'),
    address: text('address'),
    city: text('city'),
    country: text('country'),
    postCode: text('post_code'),
    url: text('url'),
    bio: text('bio'),
    role: userRoleEnum('role').notNull().default('member'),
    authUserId: integer('auth_user_id')
        .references(() => authUsersTable.id)
        .notNull(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

const usersRelations = relations(usersTable, ({ one }) => ({
    authUser: one(authUsersTable, {
        fields: [usersTable.authUserId],
        references: [authUsersTable.id],
    }),
    group: one(groupsTable, {
        fields: [usersTable.groupId],
        references: [groupsTable.id],
    }),
}))

const authUsersRelations = relations(authUsersTable, ({ many }) => ({
    users: many(usersTable),
}))

export const groupTypeEnum = pgEnum('groupType', ['client', 'vendor'])
export const groupLevelEnum = pgEnum('groupLevel', [
    'trial',
    'basic',
    'premium',
])
export const groupStatusEnum = pgEnum('groupStatus', [
    'active',
    'inactive',
    'pending',
])

export const groupsTable = pgTable('groups', {
    id: serial('id').primaryKey(),
    type: groupTypeEnum('type').notNull().default('client'),
    status: groupStatusEnum('status').notNull().default('pending'),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    city: text('city'),
    country: text('country'),
    postCode: text('post_code'),
    verified: boolean('is_verified').notNull().default(false),
    verifiedOn: timestamp('verified_on', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const groupsRelations = relations(groupsTable, ({ many }) => ({
    users: many(usersTable),
}))

export const permissionsTable = pgTable(
    'permissions',
    {
        groupId: integer('group_id')
            .references(() => groupsTable.id)
            .notNull(),
        role: userRoleEnum('role').notNull(),
        area: text('area').notNull(),
        access: integer('access').notNull().default(1), // refer to README.md for access levels
    },
    (table) => {
        return {
            pk: primaryKey({
                columns: [table.groupId, table.role, table.area],
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

// section: tasks
export const taskStatusEnum = pgEnum('taskStatus', [
    'pending',
    'in_progress',
    'completed',
    'overdue',
])

export const tasksTable = pgTable('tasks', {
    id: serial('id').primaryKey(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    todo: text('todo').notNull(),
    assignedUserId: integer('assigned_user_id').references(() => usersTable.id),
    assignedRole: userRoleEnum('assigned_role'),
    dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
    status: taskStatusEnum('status').notNull().default('pending'),
    note: text('note'),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const tasksRelations = relations(tasksTable, ({ one }) => ({
    group: one(groupsTable, {
        fields: [tasksTable.groupId],
        references: [groupsTable.id],
    }),
    assignedUser: one(usersTable, {
        fields: [tasksTable.assignedUserId],
        references: [usersTable.id],
    }),
}))

// section: invoices, invoice items, payments

export const invoiceStatusEnum = pgEnum('invoiceStatus', [
    'unpaid',
    'partially_paid',
    'fully_paid',
    'canceled',
])

export const invoicesTable = pgTable('invoices', {
    id: serial('id').primaryKey(),
    invoiceCode: text('invoice_code').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
    status: invoiceStatusEnum('status').notNull().default('unpaid'),
    totalDueAmount: integer('total_due_amount').notNull(),
    remainingDueAmount: integer('remaining_due_amount').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const paymentsTable = pgTable('payments', {
    id: serial('id').primaryKey(),
    invoiceId: integer('invoice_id')
        .references(() => invoicesTable.id)
        .notNull(),
    amountPaid: integer('amount_paid').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    isFullyPaid: boolean('is_fully_paid').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const invoiceItemsTable = pgTable('invoice_items', {
    id: serial('id').primaryKey(),
    invoiceId: integer('invoice_id')
        .references(() => invoicesTable.id)
        .notNull(),
    serviceCode: text('service_code').notNull(),
    serviceRendered: text('service_rendered').notNull(),
    unitPrice: integer('unit_price').notNull(),
    qty: integer('qty').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const invoicesRelations = relations(invoicesTable, ({ many }) => ({
    payments: many(paymentsTable),
    invoiceItems: many(invoiceItemsTable),
}))

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
    invoice: one(invoicesTable, {
        fields: [paymentsTable.invoiceId],
        references: [invoicesTable.id],
    }),
}))

export const invoiceItemsRelations = relations(
    invoiceItemsTable,
    ({ one }) => ({
        invoice: one(invoicesTable, {
            fields: [invoiceItemsTable.invoiceId],
            references: [invoicesTable.id],
        }),
    }),
)

// section: subscriptions, billing

export const billingTable = pgTable('billing', {
    id: serial('id').primaryKey(),
    address: text('address').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const subscriptionsTable = pgTable('subscriptions', {
    id: serial('id').primaryKey(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    planId: text('plan_id').notNull(),
    startDate: timestamp('start_date', { withTimezone: true }).notNull(),
    endDate: timestamp('end_date', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const subscriptionsRelations = relations(
    subscriptionsTable,
    ({ one }) => ({
        group: one(groupsTable, {
            fields: [subscriptionsTable.groupId],
            references: [groupsTable.id],
        }),
    }),
)

// section: appointments, events, cases
export const showMeAsEnum = pgEnum('show_me_as', ['Busy', 'Available'])
export const statusEnum = pgEnum('status', ['Active', 'Disabled'])

export const appointmentsTable = pgTable('appointments', {
    id: serial('id').primaryKey(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    vendorUserId: integer('vendor_user_id')
        .references(() => usersTable.id)
        .notNull(),
    clientUserId: integer('client_user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp', {
        withTimezone: true,
    }).notNull(),
    endTimestamp: timestamp('end_timestamp', { withTimezone: true }).notNull(),
    description: text('description'),
    notesForVendor: text('notes_for_vendor'),
    notesForClient: text('notes_for_client'),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const appointmentsRelations = relations(
    appointmentsTable,
    ({ one }) => ({
        vendorUser: one(usersTable, {
            fields: [appointmentsTable.vendorUserId],
            references: [usersTable.id],
        }),
        clientUser: one(usersTable, {
            fields: [appointmentsTable.clientUserId],
            references: [usersTable.id],
        }),
        group: one(groupsTable, {
            fields: [appointmentsTable.groupId],
            references: [groupsTable.id],
        }),
    }),
)

// Events Table
export const eventsTable = pgTable('events', {
    id: serial('id').primaryKey(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    userId: integer('user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp', {
        withTimezone: true,
    }).notNull(),
    endTimestamp: timestamp('end_timestamp', { withTimezone: true }).notNull(),
    description: text('description'),
    showMeAs: showMeAsEnum('show_me_as').notNull(),
    wholeDay: boolean('whole_day').notNull(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    status: statusEnum('status').notNull(),
    caseId: integer('case_id')
        .references(() => casesTable.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const eventsRelations = relations(eventsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [eventsTable.userId],
        references: [usersTable.id],
    }),
    group: one(groupsTable, {
        fields: [eventsTable.groupId],
        references: [groupsTable.id],
    }),
    case: one(casesTable, {
        fields: [eventsTable.caseId],
        references: [casesTable.id],
    }),
}))

// Cases Table
export const casesTable = pgTable('cases', {
    id: serial('id').primaryKey(),
    number: text('number').notNull(),
    name: text('name').notNull(),
    defendant: text('defendant').notNull(),
    plaintiffName: text('plaintiff_name').notNull(),
    plaintiffGroupId: integer('plaintiff_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    court: text('court').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const casesRelations = relations(casesTable, ({ one, many }) => ({
    plaintiffGroup: one(groupsTable, {
        fields: [casesTable.plaintiffGroupId],
        references: [groupsTable.id],
    }),
    group: one(groupsTable, {
        fields: [casesTable.groupId],
        references: [groupsTable.id],
    }),
    events: many(eventsTable),
}))

// section: documents, document_sharing

export const documentsTable = pgTable('documents', {
    id: serial('id').primaryKey(),
    filename: text('filename').notNull(),
    url: text('url').notNull(),
    mimetype: text('mimetype').notNull(),
    size: integer('size').notNull(),
    linkedEntity: text('linked_entity').notNull(),
    linkedId: integer('linked_id').notNull(),
    description: text('description'),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
})

export const documentsRelations = relations(documentsTable, ({ one }) => ({
    group: one(groupsTable, {
        fields: [documentsTable.groupId],
        references: [groupsTable.id],
    }),
}))

export const documentSharingTable = pgTable('document_sharing', {
    id: serial('id').primaryKey(),
    senderGroupId: integer('sender_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    receiverGroupId: integer('receiver_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    documentId: integer('document_id')
        .references(() => documentsTable.id)
        .notNull(),
    senderUserId: integer('sender_user_id')
        .references(() => usersTable.id)
        .notNull(),
    receiverUserId: integer('receiver_user_id').references(() => usersTable.id),
    expiryDate: timestamp('expiry_date', { withTimezone: true }).notNull(),
})

export const documentSharingRelations = relations(
    documentSharingTable,
    ({ one }) => ({
        senderGroup: one(groupsTable, {
            fields: [documentSharingTable.senderGroupId],
            references: [groupsTable.id],
        }),
        receiverGroup: one(groupsTable, {
            fields: [documentSharingTable.receiverGroupId],
            references: [groupsTable.id],
        }),
        document: one(documentsTable, {
            fields: [documentSharingTable.documentId],
            references: [documentsTable.id],
        }),
        senderUser: one(usersTable, {
            fields: [documentSharingTable.senderUserId],
            references: [usersTable.id],
        }),
        receiverUser: one(usersTable, {
            fields: [documentSharingTable.receiverUserId],
            references: [usersTable.id],
        }),
    }),
)

// section: messages

export const messagesTable = pgTable('messages', {
    id: serial('id').primaryKey(),
    vendorUserId: integer('vendor_user_id')
        .references(() => usersTable.id)
        .notNull(),
    clientUserId: integer('client_user_id')
        .references(() => usersTable.id)
        .notNull(),
    readableByVendorGroup: boolean('readable_by_vendor_group')
        .notNull()
        .default(false),
    readableByClientGroup: boolean('readable_by_client_group')
        .notNull()
        .default(false),
    date: timestamp('date', { withTimezone: true }).notNull(),
    replyByDate: date('reply_by_date'),
    message: text('message').notNull(),
})

export const messagesRelations = relations(messagesTable, ({ one, many }) => ({
    vendorUser: one(usersTable, {
        fields: [messagesTable.vendorUserId],
        references: [usersTable.id],
    }),
    clientUser: one(usersTable, {
        fields: [messagesTable.clientUserId],
        references: [usersTable.id],
    }),
}))

// section: Storage Table
export const storageTable = pgTable('storage', {
    id: serial('id').primaryKey(),
})

//  section: Courts Table
export const courtsTable = pgTable('courts', {
    id: serial('id').primaryKey(),
})
