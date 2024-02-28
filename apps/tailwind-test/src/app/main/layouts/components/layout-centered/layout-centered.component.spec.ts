import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutCenteredComponent } from './layout-centered.component'

describe('LayoutCenteredComponent', () => {
    let component: LayoutCenteredComponent
    let fixture: ComponentFixture<LayoutCenteredComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutCenteredComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LayoutCenteredComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
