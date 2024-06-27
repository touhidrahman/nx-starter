import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@myorg/page-layouts'

export const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/page-home/page-home.component').then(
                (m) => m.PageHomeComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/home',
        loadComponent: () =>
            import(
                './pages/page-dashboard-home/page-dashboard-home.component'
            ).then((m) => m.PageDashboardHomeComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/case/:id',
        loadComponent: () =>
            import('./pages/page-case/page-case.component').then(
                (m) => m.PageCaseComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'account-created',
        loadComponent: () =>
            import(
                './pages/page-account-created/page-account-created.component'
            ).then((m) => m.PageAccountCreatedComponent),
        resolve: { layout: setLayout(PageLayout.Center) },
    },
    {
        path: 'account-verified',
        loadComponent: () =>
            import(
                './pages/page-account-verified/page-account-verified.component'
            ).then((m) => m.PageAccountVerifiedComponent),
        resolve: { layout: setLayout(PageLayout.Center) },
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
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
