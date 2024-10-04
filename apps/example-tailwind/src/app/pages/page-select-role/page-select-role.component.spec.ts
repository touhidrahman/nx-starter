import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageSelectRoleComponent } from './page-select-role.component'

describe('PageSelectRoleComponent', () => {
    let component: PageSelectRoleComponent
    let fixture: ComponentFixture<PageSelectRoleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageSelectRoleComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageSelectRoleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
