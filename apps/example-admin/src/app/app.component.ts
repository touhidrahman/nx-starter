import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PageLayout, PageLayoutService } from '@myorg/page-layouts'
import { LucideIconConfig } from 'lucide-angular'
import { NgxSonnerToaster } from 'ngx-sonner'
import { LayoutCenteredComponent } from './main/layouts/components/layout-centered/layout-centered.component'
import { LayoutDefaultComponent } from './main/layouts/components/layout-default/layout-default.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        LayoutDefaultComponent,
        LayoutCenteredComponent,
        RouterModule,
        NgxSonnerToaster,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly PageLayout = PageLayout

    layoutService = inject(PageLayoutService)

    constructor(private lucideConfig: LucideIconConfig) {
        this.lucideConfig.strokeWidth = 2
        this.lucideConfig.size = 16
    }
}
