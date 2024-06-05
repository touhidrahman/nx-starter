import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAccountCreatedComponent } from './page-account-created.component'

describe('PageAccountCreatedComponent', () => {
    let component: PageAccountCreatedComponent
    let fixture: ComponentFixture<PageAccountCreatedComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAccountCreatedComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAccountCreatedComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
