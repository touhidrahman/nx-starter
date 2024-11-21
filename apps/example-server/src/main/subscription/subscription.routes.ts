import { createRouter } from '../../core/create-app'
import {
    getSubscriptionListHandler,
    getSubscriptionListRoute,
} from './routes/get-subscription-list'
import {
    updateSubscriptionHandler,
    updateSubscriptionRoute,
} from './routes/update-subscription'
import {
    deleteSubscriptionHandler,
    deleteSubscriptionRoute,
} from './routes/delete-subscription'
import {
    deleteAllSubscriptionHandler,
    deleteAllSubscriptionRoute,
} from './routes/delete-all-subscription'
import {
    createSubscriptionsHandler,
    createSubscriptionsRoute,
} from './routes/create-subscription'

export const subscriptionV1Route = createRouter()
// .openapi(createSubscriptionsRoute, createSubscriptionsHandler)
// .openapi(getSubscriptionListRoute, getSubscriptionListHandler)
// .openapi(updateSubscriptionRoute, updateSubscriptionHandler)
// .openapi(deleteSubscriptionRoute, deleteSubscriptionHandler)
// .openapi(deleteAllSubscriptionRoute, deleteAllSubscriptionHandler)
// .openapi(deleteAllSubscriptionRoute, deleteAllSubscriptionHandler)
