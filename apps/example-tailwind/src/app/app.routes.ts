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
        path: '',
        loadComponent: () =>
            import('./pages/page-landing/page-landing.component').then(
                (m) => m.PageLandingComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
        pathMatch: 'full',
    },
    {
        path: 'lawyers',
        loadComponent: () =>
            import('./pages/page-lawyers/page-lawyers.component').then(
                (m) => m.PageLawyersComponent,
            ),
        resolve: { layout: setLayout(PageLayout.PublicSecondary) },
    },
    {
        path: 'blogs',
        loadComponent: () =>
            import('./pages/page-blogs/page-blogs.component').then(
                (m) => m.PageBlogsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.PublicSecondary) },
    },
    {
        path: 'news',
        loadComponent: () =>
            import('./pages/page-news/page-news.component').then(
                (m) => m.PageNewsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.PublicSecondary) },
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
        path: 'dashboard/case/:id',
        loadComponent: () =>
            import('./pages/page-case/page-case.component').then(
                (m) => m.PageCaseComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/appointments',
        loadComponent: () =>
            import(
                './pages/page-appointments/page-appointments.component'
            ).then((m) => m.PageAppointmentsComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/calender',
        loadComponent: () =>
            import('./pages/page-calender/page-calender.component').then(
                (m) => m.PageCalenderComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },

    {
        path: 'select-role',
        loadComponent: () =>
            import('./pages/page-select-role/page-select-role.component').then(
                (m) => m.PageSelectRoleComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Cta) },
    },
    {
        path: 'lawyer-team',
        loadComponent: () =>
            import('./pages/page-lawyer-team/page-lawyer-team.component').then(
                (m) => m.PageLawyerTeamComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Cta) },
    },
    {
        path: 'client-team',
        loadComponent: () =>
            import('./pages/page-client-team/page-client-team.component').then(
                (m) => m.PageClientTeamComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Cta) },
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
    {
        path: 'dashboard/organizations',
        loadComponent: () =>
            import(
                './pages/page-organization/page-organization.component'
            ).then((m) => m.PageOrganizationComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/clients',
        loadComponent: () =>
            import('./pages/page-clients/page-clients.component').then(
                (m) => m.PageClientsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'dashboard/client/:id',
        loadComponent: () =>
            import('./pages/page-client/page-client.component').then(
                (m) => m.PageClientComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'lawyer/home',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-lawyer-dashboard/page-lawyer-dashboard.component'
            ).then((m) => m.PageLawyerDashboardComponent),
        resolve: { layout: setLayout(PageLayout.lawyerDefault) },
    },
    {
        path: 'lawyer/organization',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-lawyer-organization/page-lawyer-organization.component'
            ).then((m) => m.PageLawyerOrganizationComponent),
        resolve: { layout: setLayout(PageLayout.lawyerDefault) },
    },
    {
        path: 'lawyer/profile',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-lawyer-profile/page-lawyer-profile.component'
            ).then((m) => m.PageLawyerProfileComponent),
        resolve: { layout: setLayout(PageLayout.lawyerDefault) },
    },
    {
        path: 'lawyer/settings',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-lawyer-settings/page-lawyer-settings.component'
            ).then((m) => m.PageLawyerSettingsComponent),
        resolve: { layout: setLayout(PageLayout.lawyerDefault) },
    },
    {
        path: 'pricing',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-subscription/page-subscription.component'
            ).then((m) => m.PageSubscriptionComponent),
    },
    {
        path: 'lawyer/forgot-password',
        loadComponent: () =>
            import(
                './pages/lawyer-account-pages/page-lawyer-forgot-password/page-lawyer-forgot-password.component'
            ).then((m) => m.PageLawyerForgotPasswordComponent),
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
