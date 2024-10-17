import { AppOpenAPI } from './core.type'
import { apiReference } from '@scalar/hono-api-reference'

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            title: 'Example Server',
            version: '1.0.0',
            description: 'Example server built with Hono',
        },
    })

    app.get(
        '/reference',
        apiReference({
            spec: {
                url: '/doc',
            },
        }),
    )
}
