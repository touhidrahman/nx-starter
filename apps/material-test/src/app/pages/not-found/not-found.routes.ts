import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@myorg/page-layouts'

export type NotFoundPageRoutes = {
    index: Route
}

export function getNotFoundPageRoutes(): NotFoundPageRoutes {
    return {
        index: {
            path: '**',
            title: '404',
            resolve: { layout: setLayout(PageLayout.Center) },
            loadComponent: () => import('./not-found.page'),
        },
    }
}
