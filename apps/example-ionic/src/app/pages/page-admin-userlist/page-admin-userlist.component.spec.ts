import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAdminUserlistComponent } from './page-admin-userlist.component'

describe('PageAdminUserlistComponent', () => {
    let component: PageAdminUserlistComponent
    let fixture: ComponentFixture<PageAdminUserlistComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAdminUserlistComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAdminUserlistComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
