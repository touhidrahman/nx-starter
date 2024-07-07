import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CasesCarouselComponent } from './cases-carousel.component'

describe('CasesCarouselComponent', () => {
    let component: CasesCarouselComponent
    let fixture: ComponentFixture<CasesCarouselComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CasesCarouselComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CasesCarouselComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
