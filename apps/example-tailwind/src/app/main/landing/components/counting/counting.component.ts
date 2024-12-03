import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    OnInit,
    QueryList,
    Renderer2,
    Signal,
    ViewChildren,
    viewChildren,
} from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-counting',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counting.component.html',
    styleUrl: './counting.component.scss',
})
export class CountingComponent {}
