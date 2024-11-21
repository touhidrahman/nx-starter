import { createRouter } from '../../core/create-app'
import { getTaskListHandler, getTaskListRoute } from './routes/get-task-list'
import { getTaskHandler, getTaskRoute } from './routes/get-task'
import { createTaskHandler, createTaskRoute } from './routes/create-task'
import { deleteTaskHandler, deleteTaskRoute } from './routes/delete-task'
import {
    deleteManyTaskHandler,
    deleteManyTaskRoute,
} from './routes/delete-many-task'
import { updateTaskHandler, updateTaskRoute } from './routes/update-task'

export const taskV1Route = createRouter()
// .openapi(getTaskListRoute, getTaskListHandler)
// .openapi(getTaskRoute, getTaskHandler)
// .openapi(createTaskRoute, createTaskHandler)
// .openapi(updateTaskRoute, updateTaskHandler)
// .openapi(deleteTaskRoute, deleteTaskHandler)
// .openapi(deleteManyTaskRoute, deleteManyTaskHandler)
