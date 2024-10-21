import { swaggerUI } from '@hono/swagger-ui'
import { AppOpenAPI } from './core.type'

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/openapi.json', {
        openapi: '3.0.0',
        info: {
            title: 'Example Server',
            version: '1.0.0',
            description: 'Example server built with Hono',
        },
    })

    app.get(
        '/docs',
        swaggerUI({
            url: '/openapi.json',
        }),
    )
}
