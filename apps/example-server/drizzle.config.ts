import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import * as process from 'node:process'

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? '',
    },
    schema: './src/core/db/schema.ts',
    out: './migrations',
    verbose: false,
    strict: true,
    migrations: {
        schema: 'public', // used in PostgreSQL only and default to `drizzle`
    },
})
