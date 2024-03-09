import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@myorg/page-layouts'

export type HomeRoutes = {
    index: Route
    redirect: Route
}

export function getHomeRoutes(): HomeRoutes {
    return {
        index: {
            path: '',
            title: 'Home',
            resolve: { layout: setLayout(PageLayout.Default) },
            loadComponent: () => import('./home.component'),
        },
        redirect: {
            path: 'home',
            redirectTo: '',
            pathMatch: 'full',
        },
    }
}
