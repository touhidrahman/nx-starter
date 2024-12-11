import { Route } from '@angular/router'
import { PageLayout, setLayout } from '@myorg/page-layouts'

const authRoutes: Route[] = [
    {
        path: 'signup',
        loadComponent: () =>
            import('@myorg/app-example-auth').then(
                (m) => m.PageSignUpComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('@myorg/app-example-auth').then(
                (m) => m.PageForgotPasswordComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('@myorg/app-example-auth').then(
                (m) => m.PageResetPasswordComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'account-created',
        loadComponent: () =>
            import('@myorg/app-example-auth').then(
                (m) => m.PageAccountCreatedComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'account-verify/:token',
        loadComponent: () =>
            import('@myorg/app-example-auth').then(
                (m) => m.PageAccountVerifyComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'login',
        loadComponent: () =>
            import('@myorg/app-example-auth').then((m) => m.PageLoginComponent),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
]

export const appRoutes: Route[] = [
    ...authRoutes,
    {
        path: 'dashboard-home',
        loadComponent: () =>
            import(
                './pages/page-dashboard-home/page-dashboard-home.component'
            ).then((m) => m.PageDashboardHomeComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/area-management',
        loadComponent: () =>
            import(
                './pages/page-area-management/page-area-management.component'
            ).then((m) => m.PageAreaManagementComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'group-management',
        loadComponent: () =>
            import(
                './pages/page-group-management/page-group-management.component'
            ).then((m) => m.PageGroupManagementComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/page-profile/page-profile.component').then(
                (m) => m.PageProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/cases',
        loadComponent: () =>
            import('./pages/page-cases/page-cases.component').then(
                (m) => m.PageCasesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },

    {
        path: 'admin-userlist',
        loadComponent: () =>
            import(
                './pages/page-admin-userlist/page-admin-userlist.component'
            ).then((m) => m.PageAdminUserlistComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },

    {
        path: 'client-user-list',
        loadComponent: () =>
            import(
                './pages/page-client-user-list/page-user-list.component'
            ).then((m) => m.PageUserListComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: '',
        redirectTo: 'dashboard-home',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () =>
            import('@myorg/app-example-public-pages').then(
                (m) => m.PageNotFoundComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
]
