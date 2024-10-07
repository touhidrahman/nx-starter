import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle as drizzleForPgLite } from 'drizzle-orm/pglite'
import { drizzle as drizzleForNeon } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { PGlite } from '@electric-sql/pglite'

config({ path: '.env' })

const clientPgLite = new PGlite('./../../../temp/pgdata')

const dbUrl = process.env.DATABASE_URL ?? ''
const clientNeon = neon(dbUrl)

const dbNeon = drizzleForNeon(clientNeon, { schema, logger: true })
const dbPgLite = drizzleForPgLite(clientPgLite, { schema, logger: true })

export const db = process.env.DEV_DB_MODE === 'local' ? dbPgLite : dbNeon
export const client =
    process.env.DEV_DB_MODE === 'local' ? clientPgLite : clientNeon
