import { createRouter } from '../../core/create-app'
import {
    createApplicationAreaHandler,
    createApplicationAreaRoute,
} from './routes/create-application-areas'
import {
    deleteApplicationAreaHandler,
    deleteApplicationAreaRoute,
} from './routes/delete-application-areas'
import {
    getApplicationAreaHandler,
    getApplicationAreaRoute,
} from './routes/get-application-area'
import {
    getApplicationAreasHandler,
    getApplicationAreasRoute,
} from './routes/get-application-areas'
import {
    updateApplicationAreaHandler,
    updateApplicationAreaRoute,
} from './routes/update-application-areas'

export const applicationAreasV1Routes = createRouter()
    .openapi(createApplicationAreaRoute, createApplicationAreaHandler)
    .openapi(getApplicationAreaRoute, getApplicationAreaHandler)
    .openapi(getApplicationAreasRoute, getApplicationAreasHandler)
    .openapi(updateApplicationAreaRoute, updateApplicationAreaHandler)
    .openapi(deleteApplicationAreaRoute, deleteApplicationAreaHandler)
