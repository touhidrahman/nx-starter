import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-page-case',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
})
export class PageCaseComponent implements OnInit {
    activateRoute = inject(ActivatedRoute)

    ngOnInit() {
        this.activateRoute.paramMap.subscribe((p) => {
            console.log(p.get('id'))
        })
    }
}
