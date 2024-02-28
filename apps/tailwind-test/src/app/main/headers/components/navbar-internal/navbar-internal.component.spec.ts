import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavbarInternalComponent } from './navbar-internal.component'

describe('NavbarInternalComponent', () => {
    let component: NavbarInternalComponent
    let fixture: ComponentFixture<NavbarInternalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarInternalComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(NavbarInternalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
