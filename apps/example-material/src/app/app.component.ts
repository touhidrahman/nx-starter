import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { TokenSharingService } from '@myorg/common-auth'
import { PageLayout, PageLayoutService } from '@myorg/page-layouts'
import { LayoutCenteredComponent } from './main/layout/layout-centered/layout-centered.component'
import { LayoutDefaultComponent } from './main/layout/layout-default/layout-default.component'
import { LayoutSidebarComponent } from './main/layout/layout-sidebar/layout-sidebar.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        LayoutCenteredComponent,
        LayoutDefaultComponent,
        LayoutSidebarComponent,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    pageLayoutService = inject(PageLayoutService)
    private tokenSharingService = inject(TokenSharingService)
    private matIconRegistry = inject(MatIconRegistry)

    readonly PageLayout = PageLayout

    constructor() {
        this.matIconRegistry.registerFontClassAlias(
            'material-symbols-outlined',
            'Material Icons Outlined mat-ligature-font',
        )
        this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined')
        this.tokenSharingService.init()
    }
}
