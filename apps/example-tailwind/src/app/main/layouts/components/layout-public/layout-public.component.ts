import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderPublicComponent } from "../../../headers/components/header-public/header-public.component";

@Component({
    selector: 'app-layout-public',
    standalone: true,
    imports: [CommonModule, HeaderPublicComponent],
    templateUrl: './layout-public.component.html',
    styleUrl: './layout-public.component.scss',
})
export class LayoutPublicComponent {}
