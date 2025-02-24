import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'
import env from '../../env'

export function customLogger() {
    return pinoLogger({
        pino: pino(
            {
                level: env.LOG_LEVEL ?? 'info',
                redact: ['req.headers.authorization'],
            },
            env.NODE_ENV === 'production' ? undefined : pretty(),
        ),
        http:
            env.NODE_ENV === 'development'
                ? false
                : { reqId: () => crypto.randomUUID() },
    })
}
