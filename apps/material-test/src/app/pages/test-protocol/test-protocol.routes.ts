import { Route } from '@angular/router'
import { PageLayout, setLayout } from '@my-nx-starter/page-layouts'

export type TestProtocolRoute = {
    index: Route
}

export function getTestProtocolRoute(): TestProtocolRoute {
    return {
        index: {
            path: 'test-protocol',
            title: 'Test Protocol',
            resolve: { layout: setLayout(PageLayout.Default) },
            loadComponent: () =>
                import('./test-protocol.component').then(
                    (m) => m.TestProtocolComponent,
                ),
        },
    }
}
