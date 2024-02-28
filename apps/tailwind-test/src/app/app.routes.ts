import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@my-nx-starter/page-layouts'

export const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/page-home/page-home.component').then(
                (m) => m.PageHomeComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'test-protocol',
        loadComponent: () =>
            import(
                './pages/page-test-protocol/page-test-protocol.component'
            ).then((m) => m.PageTestProtocolComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'execution-test',
        title: 'Execution Test',
        loadComponent: () =>
            import(
                './pages/page-execution-test/page-execution-test.component'
            ).then((m) => m.PageExecutionTestComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: 'approvals',
        loadComponent: () =>
            import(
                './pages/page-approval-list/page-approval-list.component'
            ).then((m) => m.PageApprovalListComponent),
        resolve: { layout: setLayout(PageLayout.Default) },
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
