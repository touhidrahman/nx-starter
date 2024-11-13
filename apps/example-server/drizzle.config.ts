import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://postgres:123456@localhost:5432/sheresta',
    },
    schema: './src/core/db/schema.ts',
    out: './migrations',
    verbose: true,
    strict: true,
})
