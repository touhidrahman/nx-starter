import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PageLayout, PageLayoutService } from '@myorg/page-layouts'
import { LucideIconConfig } from 'lucide-angular'
import { NgxSonnerToaster } from 'ngx-sonner'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmPopup } from 'primeng/confirmpopup'
import { Toast } from 'primeng/toast'
import { LayoutCenteredComponent } from './main/layouts/components/layout-centered/layout-centered.component'
import { LayoutCtaComponent } from './main/layouts/components/layout-cta/layout-cta.component'
import { LayoutDefaultComponent } from './main/layouts/components/layout-default/layout-default.component'
import { LayoutPublicComponent } from './main/layouts/components/layout-public/layout-public.component'
import { LayoutAdminComponent } from './main/layouts/components/layout-admin/layout-admin.component'

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
        LayoutAdminComponent,

        // temp
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private lucideConfig = inject(LucideIconConfig)

    readonly PageLayout = PageLayout

    layoutService = inject(PageLayoutService)

    constructor() {
        this.lucideConfig.strokeWidth = 2
        this.lucideConfig.size = 16
    }
}
