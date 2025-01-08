import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core'
import { AsyncPipe, CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { FormsModule } from '@angular/forms'
import { SelectModule } from 'primeng/select'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { PaginatorModule } from 'primeng/paginator'
import { LawyerStateService } from '@myorg/app-example-states'
import { LawyerCardComponent } from '../../main/lawyer/lawyer-card/lawyer-card.component'

interface Lawyer {
    img: string
    content: string
    bg: string
    name: string
    title: string
    specialization: string
    education: string
    contact: string
    description: string
}

export interface PaginatorState {
    first: number
    rows: number
    page: number
    pageCount: number
}

@Component({
    selector: 'app-page-lawyers',
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        SelectModule,
        CardModule,
        AvatarModule,
        TagModule,
        PaginatorModule,
        AsyncPipe,
        LawyerCardComponent,
    ],
    templateUrl: './page-lawyers.component.html',
    styleUrl: './page-lawyers.component.scss',
    providers: [LawyerStateService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLawyersComponent implements OnInit {
    lawyerStateService = inject(LawyerStateService)

    districts: { name: string; thana: string[] }[] | undefined

    selectedDistrict!: { name: string; thana: string[] }

    searchText!: string

    displayedLawyers: Lawyer[] = []
    totalRecords = 0
    rowsPerPage = 9

    ngOnInit() {
        this.lawyerStateService.init()
    }

    //! TODO: fix event type properly later
    onPageChange(event: Partial<PaginatorState>) {
        const startIndex = event.first as number
        const endIndex = startIndex + (event as PaginatorState)?.rows
    }
}
