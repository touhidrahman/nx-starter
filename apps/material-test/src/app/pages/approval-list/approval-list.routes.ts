import { Route } from '@angular/router'
import { setLayout, PageLayout } from '@myorg/page-layouts'

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
