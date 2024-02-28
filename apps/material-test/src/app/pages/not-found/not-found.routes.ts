import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@my-nx-starter/page-layouts'

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
