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
        path: 'client-client-user-list',
        loadComponent: () =>
            import(
                './pages/page-client-user-list/page-client-user-list.component'
            ).then((m) => m.PageClientUserListComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'lawyer-registration',
        loadComponent: () =>
            import('./pages/page-lawyer-registration/page-lawyer-registration.component').then(
                (c) => c.PageLawyerRegistrationComponent
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'lawyer-list',
        loadComponent: () =>
            import('./pages/page-lawyer-list/page-lawyer-list.component').then(
                (m) => m.PageLawyerListComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'blogs',
        loadComponent: () =>
            import('./pages/page-blog/page-blog.component').then(
                (m) => m.PageBlogComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'blogs/create',
        loadComponent: () =>
            import(
                './features/blog/components/create-blog/create-blog.component'
            ).then((m) => m.CreateBlogComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'blogs/edit/:title',
        loadComponent: () =>
            import(
                './features/blog/components/create-blog/create-blog.component'
            ).then((m) => m.CreateBlogComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'news',
        loadComponent: () =>
            import('./pages/page-news/page-news.component').then(
                (m) => m.PageNewsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'news/create',
        loadComponent: () =>
            import(
                './features/news/components/create-news/create-news.component'
            ).then((m) => m.CreateNewsComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'news/edit/:title',
        loadComponent: () =>
            import(
                './features/news/components/create-news/create-news.component'
            ).then((m) => m.CreateNewsComponent),
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
