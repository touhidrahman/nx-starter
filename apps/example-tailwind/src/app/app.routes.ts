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
        path: 'account-created',
        loadComponent: () =>
            import('./pages/page-account-created/page-account-created.component').then(
                (m) => m.PageAccountCreatedComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'account-verified',
        loadComponent: () =>
            import('./pages/page-account-verified/page-account-verified.component').then(
                (m) => m.PageAccountVerifiedComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/page-login/page-login.component').then(
                (m) => m.PageLoginComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./pages/page-signup/page-sign-up.component').then(
                (m) => m.PageSignUpComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('./pages/page-forgot-password/page-forgot-password.component').then(
                (m) => m.PageForgotPasswordComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./pages/page-reset-password/page-reset-password.component').then(
                (m) => m.PageResetPasswordComponent,
            ),
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
        path: 'admin-userlist',
        loadComponent: () =>
            import('./pages/page-admin-userlist/page-admin-userlist.component').then(
                (m) => m.PageAdminUserlistComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'test-protocol',
        loadComponent: () =>
            import(
                './pages/page-test-protocol/page-test-protocol.component'
            ).then((m) => m.PageTestProtocolComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'execution-test',
        title: 'Execution Test',
        loadComponent: () =>
            import(
                './pages/page-execution-test/page-execution-test.component'
            ).then((m) => m.PageExecutionTestComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'approvals',
        loadComponent: () =>
            import(
                './pages/page-approval-list/page-approval-list.component'
            ).then((m) => m.PageApprovalListComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
