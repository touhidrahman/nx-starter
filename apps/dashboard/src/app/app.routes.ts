import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'

export const appRoutes: Route[] = [
    {
        path: 'validation',
        loadChildren: () =>
            import('validation/Routes').then((m) => m.remoteRoutes),
    },
    {
        path: '',
        component: DashboardComponent,
    },
]
