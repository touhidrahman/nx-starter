import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./pages/page-login/page-login.component').then(
                (m) => m.PageLoginComponent)
    },

    {
        path: 'register',
        loadComponent: () =>
            import('./pages/page-register/page-register.component').then(
                (m) => m.PageRegisterComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('./pages/page-forgot-password/page-forgot-password.component').then(
                (m) => m.PageForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./pages/page-reset-password/page-reset-password.component').then(
                (m) => m.PageResetPasswordComponent)
    },
    {
        path: 'account-created',
        loadComponent: () =>
            import('./pages/page-account-created/page-account-created.component').then(
                (m) => m.PageAccountCreatedComponent)
    },
    {
        path: 'account-verified',
        loadComponent: () =>
            import('./pages/page-account-verified/page-account-verified.component').then(
                (m) => m.PageAccountVerifiedComponent)
    },


]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
