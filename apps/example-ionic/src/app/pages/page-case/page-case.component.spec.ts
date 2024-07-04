import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageCaseComponent } from './page-case.component'

describe('PageCaseComponent', () => {
    let component: PageCaseComponent
    let fixture: ComponentFixture<PageCaseComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageCaseComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageCaseComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
