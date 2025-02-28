import { createRouter } from '../../core/create-app'
import {
    deleteStorageItemHandler,
    deleteStorageItemRoute,
} from './routes/delete-storage-item'
import {
    getStorageItemHandler,
    getStorageItemRoute,
} from './routes/get-storage-item'
import { uploadHandler, uploadRoute } from './routes/upload'

export const storageV1Routes = createRouter()
    .openapi(getStorageItemRoute, getStorageItemHandler)
    .openapi(uploadRoute, uploadHandler)
    .openapi(deleteStorageItemRoute, deleteStorageItemHandler)
