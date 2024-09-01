import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAreaManagementComponent } from './page-area-management.component'

describe('PageAreaManagementComponent', () => {
    let component: PageAreaManagementComponent
    let fixture: ComponentFixture<PageAreaManagementComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAreaManagementComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAreaManagementComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
