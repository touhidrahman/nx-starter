import { sql, SQL } from 'drizzle-orm'
import { AnyPgColumn } from 'drizzle-orm/pg-core'

export function lower(email: AnyPgColumn): SQL {
    return sql`lower(${email})`
}
