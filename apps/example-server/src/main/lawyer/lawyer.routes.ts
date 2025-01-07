import { createRouter } from '../../core/create-app'
import { createLawyerHandler, createLawyerRoute } from './routes/create-lawyer'
import { deleteLawyerHandler, deleteLawyerRoute } from './routes/delete-lawyer'
import { getLawyerHandler, getLawyerRoute } from './routes/get-lawyer'
import { getLawyersHandler, getLawyersRoute } from './routes/get-lawyers'

export const lawyerV1Routes = createRouter()
    .openapi(createLawyerRoute, createLawyerHandler)
    .openapi(getLawyersRoute, getLawyersHandler)
    .openapi(getLawyerRoute, getLawyerHandler)
    .openapi(deleteLawyerRoute, deleteLawyerHandler)
