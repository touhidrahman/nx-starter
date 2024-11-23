import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle as drizzleForNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzleForPg } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { Pool } from 'pg'

dotenv.config()

const dbUrl = process.env.DATABASE_URL ?? ''
const clientNeon = neon(dbUrl)
const pool = new Pool({ connectionString: dbUrl })

const dbNeon = drizzleForNeon(clientNeon, { schema, logger: true })
const dbPg = drizzleForPg(pool, { schema, logger: true })

export const db = process.env.DEV_DB_MODE === 'local' ? dbPg : dbNeon
export const client =
    process.env.DEV_DB_MODE === 'local' ? undefined : clientNeon
