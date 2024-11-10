import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageCalenderComponent } from './page-calender.component'

describe('PageCalenderComponent', () => {
    let component: PageCalenderComponent
    let fixture: ComponentFixture<PageCalenderComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageCalenderComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageCalenderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
