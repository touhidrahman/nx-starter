import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageTestProtocolComponent } from './page-test-protocol.component'

describe('PageTestProtocolComponent', () => {
    let component: PageTestProtocolComponent
    let fixture: ComponentFixture<PageTestProtocolComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageTestProtocolComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageTestProtocolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
