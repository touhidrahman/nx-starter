import { Route } from '@angular/router'
import { PageLayout, setLayout } from '@myorg/page-layouts'

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/page-landing/page-landing.component').then(
                (m) => m.PageLandingComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
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
        path: 'dashboard/calender',
        loadComponent: () =>
            import(
                './pages/page-calender/page-calender.component'
            ).then((m) => m.PageCalenderComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'account-verify/:token',
        loadComponent: () =>
            import(
                './pages/page-account-verify/page-account-verify.component'
            ).then((m) => m.PageAccountVerifyComponent),
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
        path: 'select-role',
        loadComponent: () =>
            import(
                './pages/page-select-role/page-select-role.component'
            ).then((m) => m.PageSelectRoleComponent),
        resolve: { layout: setLayout(PageLayout.Cta)},
    },
    {
        path: 'lawyer-team',
        loadComponent: () =>
            import(
                './pages/page-lawyer-team/page-lawyer-team.component'
            ).then((m) => m.PageLawyerTeamComponent),
        resolve: { layout: setLayout(PageLayout.Cta)},
    },
    {
        path: 'client-team',
        loadComponent: () =>
            import(
                './pages/page-client-team/page-client-team.component'
            ).then((m) => m.PageClientTeamComponent),
        resolve: { layout: setLayout(PageLayout.Cta)},
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
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details',
            },
            {
                path: 'details',
                loadComponent: () =>
                    import(
                        './main/profile/user-details/user-details.component'
                    ).then((c) => c.UserDetailsComponent),
            },
            {
                path: 'edit-profile',
                loadComponent: () =>
                    import(
                        './main/profile/profile-edit/profile-edit.component'
                    ).then((c) => c.ProfileEditComponent),
            },
            {
                path: 'password-change',
                loadComponent: () =>
                    import(
                        './main/profile/password-change/password-change.component'
                    ).then((c) => c.PasswordChangeComponent),
            },
        ],
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
        path: 'team',
        loadComponent: () =>
            import('./pages/page-team/page-team.component').then(
                (m) => m.PageTeamComponent,
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
]
