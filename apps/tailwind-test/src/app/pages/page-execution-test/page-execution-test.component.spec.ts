import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageExecutionTestComponent } from './page-execution-test.component'

describe('PageExecutionTestComponent', () => {
    let component: PageExecutionTestComponent
    let fixture: ComponentFixture<PageExecutionTestComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageExecutionTestComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageExecutionTestComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
