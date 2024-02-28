import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestProtocolComponent } from './test-protocol.component'

describe('TestProtocolComponent', () => {
    let component: TestProtocolComponent
    let fixture: ComponentFixture<TestProtocolComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestProtocolComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TestProtocolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
