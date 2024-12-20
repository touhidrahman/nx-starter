import { createRouter } from '../../core/create-app'
import { createCaseHandler, createCaseRoute } from './routes/create-case'
import { deleteCaseHandler, deleteCaseRoute } from './routes/delete-case'
import { getCaseHandler, getCaseRoute } from './routes/get-case'
import { getCasesHandler, getCasesRoute } from './routes/get-cases'
import { updateCaseHandler, updateCaseRoute } from './routes/update-case'

export const caseV1Routes = createRouter()
    .openapi(createCaseRoute, createCaseHandler)
    .openapi(getCasesRoute, getCasesHandler)
    .openapi(getCaseRoute, getCaseHandler)
    .openapi(updateCaseRoute, updateCaseHandler)
    .openapi(deleteCaseRoute, deleteCaseHandler)
