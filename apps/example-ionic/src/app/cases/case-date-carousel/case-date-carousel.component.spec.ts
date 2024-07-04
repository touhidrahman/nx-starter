import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CaseDateCarouselComponent } from './case-date-carousel.component'

describe('CaseDateCarouselComponent', () => {
    let component: CaseDateCarouselComponent
    let fixture: ComponentFixture<CaseDateCarouselComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CaseDateCarouselComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CaseDateCarouselComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
