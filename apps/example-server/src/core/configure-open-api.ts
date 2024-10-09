import { AppOpenAPI } from './core.type'

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/docs', {
        openapi: '3.0.0',
        info: {
            title: 'Example Server',
            version: '1.0.0',
            description: 'Example server built with Hono',
        },
    })
}
