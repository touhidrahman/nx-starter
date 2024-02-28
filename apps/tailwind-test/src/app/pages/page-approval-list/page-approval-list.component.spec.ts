import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageApprovalListComponent } from './page-approval-list.component'

describe('PageApprovalListComponent', () => {
    let component: PageApprovalListComponent
    let fixture: ComponentFixture<PageApprovalListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageApprovalListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageApprovalListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
