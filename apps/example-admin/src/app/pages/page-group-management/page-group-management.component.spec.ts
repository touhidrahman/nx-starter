import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageGroupManagementComponent } from './page-group-management.component'

describe('PageGroupManagementComponent', () => {
    let component: PageGroupManagementComponent
    let fixture: ComponentFixture<PageGroupManagementComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageGroupManagementComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageGroupManagementComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
