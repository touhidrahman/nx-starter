import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderPublic2Component } from './header-public2.component'

describe('HeaderPublic2Component', () => {
    let component: HeaderPublic2Component
    let fixture: ComponentFixture<HeaderPublic2Component>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderPublic2Component],
        }).compileComponents()

        fixture = TestBed.createComponent(HeaderPublic2Component)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
