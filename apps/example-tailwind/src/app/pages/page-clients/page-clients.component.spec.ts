import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageClientsComponent } from './page-clients.component'

describe('PageClientsComponent', () => {
    let component: PageClientsComponent
    let fixture: ComponentFixture<PageClientsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageClientsComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageClientsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
