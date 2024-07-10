import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderPublicComponent } from './header-public.component'

describe('HeaderPublicComponent', () => {
    let component: HeaderPublicComponent
    let fixture: ComponentFixture<HeaderPublicComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderPublicComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(HeaderPublicComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
