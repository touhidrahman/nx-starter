import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExecutionTestComponent } from './execution-test.component'

describe('ExecutionTestComponent', () => {
    let component: ExecutionTestComponent
    let fixture: ComponentFixture<ExecutionTestComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExecutionTestComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ExecutionTestComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
