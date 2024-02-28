import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LucideIconConfig } from 'lucide-angular'
import { LayoutDefaultComponent } from './main/layouts/components/layout-default/layout-default.component'
import { CommonModule } from '@angular/common'
import { LayoutCenteredComponent } from './main/layouts/components/layout-centered/layout-centered.component'
import { PageLayout, PageLayoutService } from '@my-nx-starter/page-layouts'
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        LayoutDefaultComponent,
        LayoutCenteredComponent,
        RouterModule,
        NgxSonnerToaster,
    ],
    selector: 'jsat-root',
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
