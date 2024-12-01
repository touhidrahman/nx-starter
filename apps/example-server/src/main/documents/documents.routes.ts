import { createRouter } from '../../core/create-app'
import {
    createDocumentHandler,
    createDocumentRoute,
} from './routes/create-document'
import {
    updateDocumentHandler,
    updateDocumentRoute,
} from './routes/update-document'
import { getDocumentHandler, getDocumentRoute } from './routes/get-document'
import {
    getDocumentListHandler,
    getDocumentListRoute,
} from './routes/get-document-list'
import {
    deleteAllDocumentHandler,
    deleteAllDocumentRoute,
} from './routes/delete-all-documents'
import {
    deleteDocumentHandler,
    deleteDocumentRoute,
} from './routes/delete-document'
import { replaceFileRoute, replaceFileHandler } from './routes/replace-file'
import {
    getFilesByEntityNameHandler,
    getFilesByEntityNameRoute,
} from './routes/get-documentsByEntityName'

export const documentV1Route = createRouter()
    .openapi(createDocumentRoute, createDocumentHandler)
    .openapi(updateDocumentRoute, updateDocumentHandler)
    .openapi(getDocumentRoute, getDocumentHandler)
    .openapi(getDocumentListRoute, getDocumentListHandler)
    .openapi(deleteDocumentRoute, deleteDocumentHandler)
    .openapi(deleteAllDocumentRoute, deleteAllDocumentHandler)
    .openapi(replaceFileRoute, replaceFileHandler)
    .openapi(getFilesByEntityNameRoute, getFilesByEntityNameHandler)
