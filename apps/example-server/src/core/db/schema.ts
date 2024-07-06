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
    assignedUserId: integer('assigned_user_id')
        .references(() => usersTable.id)
        .notNull(),
    assignedRoleId: integer('assigned_role_id').references(() => rolesTable.id), // optional
    dueDate: timestamp('due_date').notNull(),
    status: taskStatusEnum('status').notNull().default('pending'),
    note: text('note'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    assignedRole: one(rolesTable, {
        fields: [tasksTable.assignedRoleId],
        references: [rolesTable.id],
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    dueDate: timestamp('due_date').notNull(),
    status: invoiceStatusEnum('status').notNull().default('unpaid'),
    totalDueAmount: integer('total_due_amount').notNull(),
    remainingDueAmount: integer('remaining_due_amount').notNull(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export const paymentsTable = pgTable('payments', {
    id: serial('id').primaryKey(),
    invoiceId: integer('invoice_id')
        .references(() => invoicesTable.id)
        .notNull(),
    amountPaid: integer('amount_paid').notNull(),
    date: timestamp('date').notNull(),
    isFullyPaid: boolean('is_fully_paid').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export const subscriptionsTable = pgTable('subscriptions', {
    id: serial('id').primaryKey(),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    planId: text('plan_id').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    date: timestamp('date').notNull(),
    vendorUserId: integer('vendor_user_id')
        .references(() => usersTable.id)
        .notNull(),
    clientUserId: integer('client_user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp').notNull(),
    endTimestamp: timestamp('end_timestamp').notNull(),
    description: text('description'),
    notesForVendor: text('notes_for_vendor'),
    notesForClient: text('notes_for_client'),
    groupId: integer('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    date: timestamp('date').notNull(),
    userId: integer('user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp').notNull(),
    endTimestamp: timestamp('end_timestamp').notNull(),
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
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
    receiverUserId: integer('receiver_user_id')
        .references(() => usersTable.id)
        .notNull(),
    expiryDate: timestamp('expiry_date').notNull(),
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
    // ccUserId: integer('cc_user_id')
    //     .array()
    //     .references(() => usersTable.id), // Array of Foreign Keys
    readableByVendorGroup: boolean('readable_by_vendor_group').notNull(),
    readableByClientGroup: boolean('readable_by_client_group').notNull(),
    date: timestamp('date').notNull(),
    replyByDate: timestamp('reply_by_date'),
    message: text('message').notNull(),
    // attachmentDocumentSharingIds: integer('attachment_document_sharing_ids')
    //     .array()
    //     .references(() => documentSharingTable.id), // Array of Foreign Keys
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
    ccUsers: many(usersTable),
    attachmentDocumentSharing: many(documentSharingTable),
}))

// section: profile

export const profileTable = pgTable('profile', {
    userId: integer('user_id')
        .primaryKey()
        .references(() => usersTable.id),
    coverPhoto: text('cover_photo'),
    address: text('address'),
    phone: text('phone'),
    email: text('email'),
    url: text('url'),
    bio: text('bio'),
})

export const profileRelations = relations(profileTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [profileTable.userId],
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
