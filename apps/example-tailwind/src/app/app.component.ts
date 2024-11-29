import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PageLayout, PageLayoutService } from '@myorg/page-layouts'
import { NgxSonnerToaster } from 'ngx-sonner'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmPopup } from 'primeng/confirmpopup'
import { Toast } from 'primeng/toast'
import { LayoutCenteredComponent } from './main/layouts/components/layout-centered/layout-centered.component'
import { LayoutCtaComponent } from './main/layouts/components/layout-cta/layout-cta.component'
import { LayoutDefaultComponent } from './main/layouts/components/layout-default/layout-default.component'
import { LayoutPublicComponent } from './main/layouts/components/layout-public/layout-public.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        LayoutDefaultComponent,
        LayoutCenteredComponent,
        LayoutCtaComponent,
        LayoutPublicComponent,
        RouterModule,
        NgxSonnerToaster,
        ConfirmDialog,
        ConfirmPopup,
        Toast,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly PageLayout = PageLayout

    layoutService = inject(PageLayoutService)
}
