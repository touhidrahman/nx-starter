import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@myorg/page-layouts'

export type ExecutionTestRoute = {
    index: Route
}

export function getExecutionTestRoute(): ExecutionTestRoute {
    return {
        index: {
            path: 'execution-test',
            title: 'Execution Test',
            resolve: { layout: setLayout(PageLayout.Default) },
            loadComponent: () =>
                import('./execution-test.component').then(
                    (m) => m.ExecutionTestComponent,
                ),
        },
    }
}
