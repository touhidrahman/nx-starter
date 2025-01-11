import { relations } from 'drizzle-orm'
import {
    boolean,
    date,
    decimal,
    doublePrecision,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
} from 'drizzle-orm/pg-core'
import { generateId } from './id.util'
import { lower } from './orm.util'

/**
 * userLevelEnum is an enum for user levels in the system , applies to auth_users table only
 */
export const userLevelEnum = pgEnum('userLevel', ['user', 'moderator', 'admin'])

/**
 * userRoleEnum is an enum for user roles in the application, applies to  users table only, owner for one group
 */
export const userRoleEnum = pgEnum('userRole', ['admin', 'manager', 'member'])
export const userStatusEnum = pgEnum('userStatus', [
    'active',
    'inactive',
    'banned',
])
export const fileTypeEnum = pgEnum('fileType', [
    'image',
    'document',
    'video',
    'audio',
])

export const usersTable = pgTable(
    'users',
    {
        id: text('id').primaryKey().$defaultFn(generateId),
        firstName: text('first_name').notNull(),
        lastName: text('last_name').notNull(),
        coverPhoto: text('cover_photo'),
        profilePhoto: text('profile_photo'),
        email: text('email').notNull(),
        password: text('password').notNull(),
        phone: text('phone'),
        address: text('address'),
        city: text('city'),
        state: text('state'),
        country: text('country'),
        postCode: text('post_code'),
        url: text('url'),
        bio: text('bio'),
        lastLogin: timestamp('last_login', { withTimezone: true }),
        level: userLevelEnum('level').notNull().default('user'),
        status: userStatusEnum('status').notNull().default('active'),
        verified: boolean('is_verified').notNull().default(false),
        defaultGroupId: text('default_group_id'),
        createdAt: timestamp('created_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => [uniqueIndex('emailUniqueIndex').on(lower(table.email))],
)

export const usersGroupsTable = pgTable(
    'users_groups',
    {
        userId: text('user_id')
            .notNull()
            .references(() => usersTable.id),
        groupId: text('group_id')
            .notNull()
            .references(() => groupsTable.id),
        role: userRoleEnum('role').notNull(), // Role of the user in the group
    },
    (table) => [
        primaryKey({ columns: [table.userId, table.groupId] }), // A user can only be in a group once
    ],
)

export const usersRelations = relations(usersTable, ({ one, many }) => ({
    invites: many(invitesTable),
    documents: many(documentsTable),
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
    id: text('id').primaryKey().$defaultFn(generateId),
    type: groupTypeEnum('type').notNull().default('client'),
    status: groupStatusEnum('status').notNull().default('pending'),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    country: text('country'),
    postCode: text('post_code'),
    ownerId: text('owner_id').notNull(),
    verified: boolean('is_verified').notNull().default(false),
    verifiedOn: timestamp('verified_on', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const groupsRelations = relations(groupsTable, ({ one, many }) => ({
    owner: one(usersTable, {
        fields: [groupsTable.ownerId],
        references: [usersTable.id],
    }),
    appointments: many(appointmentsTable),
    billing: one(billingTable),
    cases: many(casesTable),
    courts: many(courtsTable),
    documentSharing: many(documentSharingTable),
    documents: many(documentsTable),
    events: many(eventsTable),
    invites: many(invitesTable),
    invoiceItems: many(invoiceItemsTable),
    invoices: many(invoicesTable),
    messages: many(messagesTable),
    payments: many(paymentsTable),
    permissions: many(permissionsTable),
    subscriptions: many(subscriptionsTable),
    tasks: many(tasksTable),
}))

export const invitesTable = pgTable('invites', {
    id: text('id').primaryKey().$defaultFn(generateId),
    email: text('email').notNull(),
    groupId: text('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    role: userRoleEnum('role').notNull().default('member'),
    invitedBy: text('invited_by')
        .references(() => usersTable.id)
        .notNull(),
    invitedOn: timestamp('invited_on', { withTimezone: true })
        .notNull()
        .defaultNow(),
    acceptedOn: timestamp('accepted_on', { withTimezone: true }),
    status: text('status').notNull().default('pending'),
})

export const invitesRelations = relations(invitesTable, ({ one }) => ({
    group: one(groupsTable, {
        fields: [invitesTable.groupId],
        references: [groupsTable.id],
    }),
    invitedBy: one(usersTable, {
        fields: [invitesTable.invitedBy],
        references: [usersTable.id],
    }),
}))

export const permissionsTable = pgTable(
    'permissions',
    {
        groupId: text('group_id')
            .references(() => groupsTable.id)
            .notNull(),
        role: userRoleEnum('role').notNull(),
        area: text('area').notNull(),
        access: integer('access').notNull().default(1), // refer to README.md for access levels
    },
    (table) => [
        primaryKey({
            columns: [table.groupId, table.role, table.area],
        }),
    ],
)

// to keep a list of areas/resources/entities in the application to attach permissions to. Usually the table names
export const applicationAreasTable = pgTable('application_areas', {
    id: text('id').primaryKey().$defaultFn(generateId),
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
    id: text('id').primaryKey().$defaultFn(generateId),
    groupId: text('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    todo: text('todo').notNull(),
    assignedUserId: text('assigned_user_id').references(() => usersTable.id),
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
    id: text('id').primaryKey().$defaultFn(generateId),
    invoiceCode: text('invoice_code').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
    status: invoiceStatusEnum('status').notNull().default('unpaid'),
    totalDueAmount: decimal('total_due_amount').notNull(),
    remainingDueAmount: decimal('remaining_due_amount').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const paymentsTable = pgTable('payments', {
    id: text('id').primaryKey().$defaultFn(generateId),
    invoiceId: text('invoice_id')
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
    id: text('id').primaryKey().$defaultFn(generateId),
    invoiceId: text('invoice_id')
        .references(() => invoicesTable.id)
        .notNull(),
    serviceCode: text('service_code').notNull(),
    serviceRendered: text('service_rendered').notNull(),
    unitPrice: decimal('unit_price').notNull(),
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

//section: Price plan
export const planRenewalTypeEnum = pgEnum('planRenewal', [
    'auto',
    'manually',
])
export const pricingPlanTable = pgTable('plan', {
    id: text('id').primaryKey().$defaultFn(generateId),
    name: text('name').notNull(),
    description: text('description'),
    monthlyPrice: decimal('monthly_price', { precision: 10, scale: 2 }).notNull(),
    yearlyPrice: decimal('yearly_price', { precision: 10, scale: 2 }),
    discountPrice: decimal('discount_price', { precision: 5, scale: 2 }),
    currency: text('currency').default('BDT'),
    isActive: boolean('is_active').default(true),
    features: text('features').array(),
    tier: text('tier'),
    trialPeriodDays: integer('trial_period_days'),
    renewalType: text('renewal_type').default('auto'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),

})

// section: subscriptions, billing

export const billingTable = pgTable('billing', {
    id: text('id').primaryKey().$defaultFn(generateId),
    address: text('address').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const subscriptionsTable = pgTable('subscriptions', {
    id: text('id').primaryKey().$defaultFn(generateId),
    groupId: text('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    planId: text('plan_id').references(() => pricingPlanTable.id).notNull(),
    startDate: timestamp('start_date', { withTimezone: true }).notNull(),
    endDate: timestamp('end_date', { withTimezone: true }).notNull(),
    paymentMethod: text('payment_method'),
    transactionId: text('transaction_id'),
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
        plan: one(pricingPlanTable, {
            fields: [subscriptionsTable.planId],
            references: [pricingPlanTable.id],
        }),
    }),
)

// section: appointments, events, cases
export const showMeAsEnum = pgEnum('show_me_as', ['Busy', 'Available'])
export const statusEnum = pgEnum('status', ['Active', 'Disabled'])

export const appointmentsTable = pgTable('appointments', {
    id: text('id').primaryKey().$defaultFn(generateId),
    date: timestamp('date', { withTimezone: true }).notNull(),
    vendorUserId: text('vendor_user_id')
        .references(() => usersTable.id)
        .notNull(),
    clientUserId: text('client_user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp', {
        withTimezone: true,
    }).notNull(),
    endTimestamp: timestamp('end_timestamp', { withTimezone: true }).notNull(),
    description: text('description'),
    notesForVendor: text('notes_for_vendor'),
    notesForClient: text('notes_for_client'),
    groupId: text('group_id')
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
    id: text('id').primaryKey().$defaultFn(generateId),
    date: timestamp('date', { withTimezone: true }).notNull(),
    userId: text('user_id')
        .references(() => usersTable.id)
        .notNull(),
    startTimestamp: timestamp('start_timestamp', {
        withTimezone: true,
    }).notNull(),
    endTimestamp: timestamp('end_timestamp', { withTimezone: true }).notNull(),
    description: text('description'),
    showMeAs: showMeAsEnum('show_me_as').notNull(),
    wholeDay: boolean('whole_day').notNull(),
    groupId: text('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    status: statusEnum('status').notNull(),
    caseId: text('case_id')
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

//lawyer table

export const lawyerTable = pgTable('lawyers', {
    id: text('id').primaryKey().$defaultFn(generateId),
    name: text('name').notNull(),
    instituteName: text('institute_name').notNull(),
    practiceStartYear: integer('practice_start_year'),
    lawyerType: text('lawyer_type').notNull(),
    phoneNumber: text('phone_number'),
    email: text('email'),
    profileImageUrl: text('profile_image_url'),
    coverImageUrl: text('cover_image_url'),
    description: text('description'),
    rating: doublePrecision('rating').default(0.0),
    address: text('address'),
    city: text('city'),
    district: text('district'),
    postCode: text('post_code'),
    website: text('website'),
    businessHours: text('business_hours'),
    sponsored: boolean('sponsored').default(false),
    sponsoredUntil: text('sponsored_until'),
    interestedArea: text('interested_area'),
    institutionId: text('institution_id'),
    latitude: text('latitude'),
    longitude: text('longitude'),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

// Cases Table
export const casesTable = pgTable('cases', {
    id: text('id').primaryKey().$defaultFn(generateId),
    number: text('number').notNull(),
    name: text('name').notNull(),
    defendant: text('defendant').notNull(),
    plaintiffName: text('plaintiff_name').notNull(),
    plaintiffGroupId: text('plaintiff_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    groupId: text('group_id')
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
    id: text('id').primaryKey().$defaultFn(generateId),
    filename: text('filename').notNull(),
    url: text('url').notNull(),
    extension: text('extension').notNull(),
    mimetype: text('mimetype').notNull(),
    type: fileTypeEnum('type').notNull(),
    size: integer('size').notNull(),
    folder: text('folder'),
    description: text('description'),
    groupId: text('group_id')
        .references(() => groupsTable.id)
        .notNull(),
    userId: text('user_id').references(() => usersTable.id),
    entityId: text('entity_id'), // The ID of the entity this upload is associated with
    entityName: text('entity_name'), // The name of the entity this upload is associated with / table name
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

export const documentsRelations = relations(documentsTable, ({ one }) => ({
    group: one(groupsTable, {
        fields: [documentsTable.groupId],
        references: [groupsTable.id],
    }),
    user: one(usersTable, {
        fields: [documentsTable.userId],
        references: [usersTable.id],
    }),
}))

export const documentSharingTable = pgTable('document_sharing', {
    id: text('id').primaryKey().$defaultFn(generateId),
    senderGroupId: text('sender_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    receiverGroupId: text('receiver_group_id')
        .references(() => groupsTable.id)
        .notNull(),
    documentId: text('document_id')
        .references(() => documentsTable.id)
        .notNull(),
    senderUserId: text('sender_user_id')
        .references(() => usersTable.id)
        .notNull(),
    receiverUserId: text('receiver_user_id').references(() => usersTable.id),
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
    id: text('id').primaryKey().$defaultFn(generateId),
    vendorUserId: text('vendor_user_id')
        .references(() => usersTable.id)
        .notNull(),
    clientUserId: text('client_user_id')
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

export const storageTable = pgTable('storage', {
    id: text('id').primaryKey().$defaultFn(generateId),
    filename: text('filename'),
    url: text('url'),
    type: fileTypeEnum('type').default('document'),
    extension: text('extension'),
    size: integer('size').default(0),
    uploadedBy: text('uploaded_by'),
    entityId: text('entity_id'),
    entityName: text('entity_name'),
    expiryDate: timestamp('expiry_date'),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .$onUpdate(() => new Date()),
})

//  section: Courts Table
export const courtsTable = pgTable('courts', {
    id: text('id').primaryKey().$defaultFn(generateId),
})
