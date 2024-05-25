import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env' })

const dbUrl = process.env.DATABASE_URL ?? ''
const sql = neon(dbUrl)

export const db = drizzle(sql)
