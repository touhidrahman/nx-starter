import { createRouter } from '../../core/create-app'
import {
    createAppointmentHandler,
    createAppointmentRoute,
} from './routes/create-appointments'
import {
    deleteAppointmentHandler,
    deleteAppointmentRoute,
} from './routes/delete-appointments'
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
} from './routes/update-appointments'

export const appointmentsV1Routes = createRouter()
    .openapi(createAppointmentRoute, createAppointmentHandler)
    .openapi(getAppointmentRoute, getAppointmentHandler)
    .openapi(getAppointmentsRoute, getAppointmentsHandler)
    .openapi(updateAppointmentRoute, updateAppointmentHandler)
    .openapi(deleteAppointmentRoute, deleteAppointmentHandler)
