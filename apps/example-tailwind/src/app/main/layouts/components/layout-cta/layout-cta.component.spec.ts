import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutCentered2Component } from './layout-centered2.component'

describe('LayoutCentered2Component', () => {
    let component: LayoutCentered2Component
    let fixture: ComponentFixture<LayoutCentered2Component>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutCentered2Component],
        }).compileComponents()

        fixture = TestBed.createComponent(LayoutCentered2Component)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
