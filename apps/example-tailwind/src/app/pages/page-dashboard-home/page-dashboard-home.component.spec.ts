import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageDashboardHomeComponent } from './page-dashboard-home.component'

describe('PageDashboardHomeComponent', () => {
    let component: PageDashboardHomeComponent
    let fixture: ComponentFixture<PageDashboardHomeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageDashboardHomeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageDashboardHomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
