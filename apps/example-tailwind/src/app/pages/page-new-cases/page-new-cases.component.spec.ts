import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageNewCasesComponent } from './page-new-cases.component'

describe('PageNewCasesComponent', () => {
    let component: PageNewCasesComponent
    let fixture: ComponentFixture<PageNewCasesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageNewCasesComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageNewCasesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
