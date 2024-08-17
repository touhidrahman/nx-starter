import { Route } from '@angular/router'
import { PageLayout, setLayout } from '@myorg/page-layouts'

export const appRoutes: Route[] = [
    {
        path: 'dashboard-home',
        loadComponent: () =>
            import(
                './pages/page-dashboard-home/page-dashboard-home.component'
            ).then((m) => m.PageDashboardHomeComponent),
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
        path: 'login',
        loadComponent: () =>
            import('./pages/page-login/page-login.component').then(
                (m) => m.PageLoginComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./pages/page-signup/page-sign-up.component').then(
                (m) => m.PageSignUpComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import(
                './pages/page-forgot-password/page-forgot-password.component'
            ).then((m) => m.PageForgotPasswordComponent),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import(
                './pages/page-reset-password/page-reset-password.component'
            ).then((m) => m.PageResetPasswordComponent),
        resolve: { layout: setLayout(PageLayout.Center) },
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
        path: '',
        redirectTo: 'dashboard-home',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/page-not-found/page-not-found.component').then(
                (m) => m.PageNotFoundComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
]
