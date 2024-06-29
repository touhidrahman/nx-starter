import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

config({ path: '.env' })

const dbUrl = process.env.DATABASE_URL ?? ''

export const client = neon(dbUrl)
export const db = drizzle(client, { schema, logger: true })
