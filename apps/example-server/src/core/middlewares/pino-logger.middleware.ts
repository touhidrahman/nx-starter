import { logger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
    return logger({
        pino: pino(
            {
                level: process.env.LOG_LEVEL ?? 'info',
                redact: ['req.headers.authorization'],
                serializers: {
                    req: pino.stdSerializers.req,
                    res: pino.stdSerializers.res,
                    err: pino.stdSerializers.err,
                },
            },
            process.env.NODE_ENV === 'production' ? undefined : pretty(),
        ),
        http: { reqId: () => crypto.randomUUID() },
    })
}
