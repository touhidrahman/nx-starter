import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
    },

    {
        path: 'welcome',
        loadComponent: () =>
            import(
                './pages/page-welcome/page-welcome1/page-welcome1.component'
            ).then((m) => m.PageWelcome1Component),
    },
    {
        path: 'welcome2',
        loadComponent: () =>
            import(
                './pages/page-welcome/page-welcome2/page-welcome2.component'
            ).then((m) => m.PageWelcome2Component),
    },
    {
        path: 'welcome3',
        loadComponent: () =>
            import(
                './pages/page-welcome/page-welcome3/page-welcome3.component'
            ).then((m) => m.PageWelcome3Component),
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./pages/page-login/page-login.component').then(
                (m) => m.PageLoginComponent,
            ),
    },

    {
        path: 'register',
        loadComponent: () =>
            import('./pages/page-register/page-register.component').then(
                (m) => m.PageRegisterComponent,
            ),
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/page-profile/page-profile.component').then(
                (m) => m.PageProfileComponent,
            ),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/page-home/page-home.component').then(
                (m) => m.PageHomeComponent,
            ),
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import(
                './pages/page-forgot-password/page-forgot-password.component'
            ).then((m) => m.PageForgotPasswordComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import(
                './pages/page-reset-password/page-reset-password.component'
            ).then((m) => m.PageResetPasswordComponent),
    },
    {
        path: 'account-created',
        loadComponent: () =>
            import(
                './pages/page-account-created/page-account-created.component'
            ).then((m) => m.PageAccountCreatedComponent),
    },
    {
        path: 'account-verified',
        loadComponent: () =>
            import(
                './pages/page-account-verified/page-account-verified.component'
            ).then((m) => m.PageAccountVerifiedComponent),
    },
    {
        path: 'dashboard/cases',
        loadComponent: () =>
            import('./pages/page-cases/page-cases.component').then(
                (m) => m.PageCasesComponent,
            ),
    },
    {
        path: 'dashboard/cases/:id',
        loadComponent: () =>
            import('./pages/page-case/page-case.component').then(
                (m) => m.PageCaseComponent,
            ),
    },
    {
        path: 'admin/userlist',
        loadComponent: () =>
            import(
                './pages/page-admin-userlist/page-admin-userlist.component'
            ).then((m) => m.PageAdminUserlistComponent),
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
