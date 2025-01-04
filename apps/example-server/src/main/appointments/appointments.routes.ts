import { createRouter } from '../../core/create-app'
import {
    createAppointmentHandler,
    createAppointmentRoute,
} from './routes/create-appointment'
import {
    deleteAppointmentHandler,
    deleteAppointmentRoute,
} from './routes/delete-appointment'
import {
    getAppointmentHandler,
    getAppointmentRoute,
} from './routes/get-appointment'
import {
    getAppointmentsHandler,
    getAppointmentsRoute,
} from './routes/get-appointments'
import {
    updateAppointmentHandler,
    updateAppointmentRoute,
} from './routes/update-appointment'

export const appointmentsV1Routes = createRouter()
    .openapi(createAppointmentRoute, createAppointmentHandler)
    .openapi(getAppointmentRoute, getAppointmentHandler)
    .openapi(getAppointmentsRoute, getAppointmentsHandler)
    .openapi(updateAppointmentRoute, updateAppointmentHandler)
    .openapi(deleteAppointmentRoute, deleteAppointmentHandler)
