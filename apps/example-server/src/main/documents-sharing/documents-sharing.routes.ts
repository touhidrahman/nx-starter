import { createRouter } from '../../core/create-app'
import {
    updateDocumentSharingHandler,
    updateDocumentSharingRoute,
} from './routes/update-document-sharing'
import {
    createDocumentSharingHandler,
    createDocumentSharingRoute,
} from './routes/create-doc-sharing'
import {
    getDocumentSharingHandler,
    getDocumentSharingRoute,
} from './routes/get-document-sharing'
import {
    getDocumentSharingListHandler,
    getDocumentSharingListRoute,
} from './routes/get-document-sharing-list'
import {
    deleteDocumentSharingHandler,
    deleteDocumentSharingRoute,
} from './routes/delete-document-sharing'
import {
    deleteAllDocumentSharingHandler,
    deleteAllDocumentSharingRoute,
} from './routes/delete-all-documents-sharing'

export const documentSharingV1Route = createRouter()
// .openapi(updateDocumentSharingRoute, updateDocumentSharingHandler)
// .openapi(createDocumentSharingRoute, createDocumentSharingHandler)
// .openapi(getDocumentSharingRoute, getDocumentSharingHandler)
// .openapi(getDocumentSharingListRoute, getDocumentSharingListHandler)
// .openapi(deleteDocumentSharingRoute, deleteDocumentSharingHandler)
// .openapi(deleteAllDocumentSharingRoute, deleteAllDocumentSharingHandler)
