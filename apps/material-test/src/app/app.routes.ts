import { Route } from '@angular/router'
import { AuthRoutes, getAuthRoutes } from './pages/auth/auth.routes'
import {
    ExecutionTestRoute,
    getExecutionTestRoute,
} from './pages/execution-test/execution-test.routes'
import { HomeRoutes, getHomeRoutes } from './pages/home/home.routes'
import {
    NotFoundPageRoutes,
    getNotFoundPageRoutes,
} from './pages/not-found/not-found.routes'
import { ProfileRoutes, getProfileRoutes } from './pages/profile/profile.routes'
import {
    TestProtocolRoute,
    getTestProtocolRoute,
} from './pages/test-protocol/test-protocol.routes'
import {
    ApprovalListRoute,
    getApprovalListRoute,
} from './pages/approval-list/approval-list.routes'

type GroupedRoutes = [
    HomeRoutes,
    TestProtocolRoute,
    ExecutionTestRoute,
    ApprovalListRoute,
    AuthRoutes,
    ProfileRoutes,
    // catch-all route must be last
    NotFoundPageRoutes,
]

const groupedRoutes: GroupedRoutes = [
    getHomeRoutes(),
    getTestProtocolRoute(),
    getExecutionTestRoute(),
    getApprovalListRoute(),
    getAuthRoutes(),
    getProfileRoutes(),
    getNotFoundPageRoutes(),
]

const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
