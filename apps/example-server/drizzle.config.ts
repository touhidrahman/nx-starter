import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import * as process from 'node:process'

console.log(process.env.DATABASE_URL);

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? '',
    },
    schema: './src/core/db/schema.ts',
    out: './migrations',
    verbose: true,
    strict: true,
    migrations: {
        schema: 'public', // used in PostgreSQL only and default to `drizzle`
    },
})
