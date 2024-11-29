import { z, ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const EnvSchema = z.object({
    NODE_ENV: z.string(),
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    FRONTEND_URL: z.string(),
    BACKEND_URL: z.string(),
    DEV_DB_MODE: z.enum(['local', 'neon']),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_BUCKET_URL: z.string(),
    S3_BUCKET: z.string(),
    S3_REGION: z.string(),
    S3_ENDPOINT: z.string(),
    EMAIL_HOST: z.string(),
    EMAIL_PORT: z.coerce.number(),
    EMAIL_USER: z.string(),
    EMAIL_PASS: z.string(),
    EMAIL_RESEND_API_KEY: z.string(),
    EMAIL_SENDER_NAME: z.string(),
    EMAIL_SENDER_EMAIL: z.string(),
})

export type TEnv = z.infer<typeof EnvSchema>

let env: TEnv

try {
    env = EnvSchema.parse(process.env)
} catch (error) {
    const e = error as ZodError
    console.error('❌ Invalid env:')
    console.error(e.flatten().fieldErrors)
    e.flatten()
    process.exit(1)
}

env = EnvSchema.parse(process.env)

export default env
