import { createRouter } from '../../core/create-app'

import { createCourtHandler, createCourtRoute } from './routes/create-court'
import { deleteCourtHandler, deleteCourtRoute } from './routes/delete-court'
import { getCourtHandler, getCourtRoute } from './routes/get-court'
import { getCourtsHandler, getCourtsRoute } from './routes/get-courts'
import { updateCourtHandler, updateCourtRoute } from './routes/update-court'

export const courtsV1Routes = createRouter()
    .openapi(createCourtRoute, createCourtHandler)
    .openapi(getCourtRoute, getCourtHandler)
    .openapi(getCourtsRoute, getCourtsHandler)
    .openapi(updateCourtRoute, updateCourtHandler)
    .openapi(deleteCourtRoute, deleteCourtHandler)
