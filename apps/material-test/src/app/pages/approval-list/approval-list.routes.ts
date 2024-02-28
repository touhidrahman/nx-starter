import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@my-nx-starter/page-layouts'

export type ApprovalListRoute = {
    index: Route
}

export function getApprovalListRoute(): ApprovalListRoute {
    return {
        index: {
            path: 'approvals',
            title: 'Approvals',
            resolve: { layout: setLayout(PageLayout.Default) },
            loadComponent: () =>
                import('./approval-list.component').then(
                    (m) => m.ApprovalListComponent,
                ),
        },
    }
}
