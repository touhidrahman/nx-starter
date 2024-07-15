import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutPublicComponent } from './layout-public.component'

describe('LayoutPublicComponent', () => {
    let component: LayoutPublicComponent
    let fixture: ComponentFixture<LayoutPublicComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutPublicComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LayoutPublicComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
