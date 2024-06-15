import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAdminDashboardHomeComponent } from './page-admin-dashboard-home.component'

describe('PageAdminDashboardHomeComponent', () => {
    let component: PageAdminDashboardHomeComponent
    let fixture: ComponentFixture<PageAdminDashboardHomeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAdminDashboardHomeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAdminDashboardHomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
