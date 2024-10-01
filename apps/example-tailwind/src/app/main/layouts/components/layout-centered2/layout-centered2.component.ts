import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderPublic2Component } from "../../../headers/components/header-public2/header-public2.component";

@Component({
    selector: 'app-layout-centered2',
    standalone: true,
    imports: [CommonModule, HeaderPublic2Component],
    templateUrl: './layout-centered2.component.html',
    styleUrl: './layout-centered2.component.scss',
})
export class LayoutCentered2Component {}
