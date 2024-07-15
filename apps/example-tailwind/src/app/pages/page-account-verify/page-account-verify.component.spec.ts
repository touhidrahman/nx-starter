import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAccountVerifyComponent } from './page-account-verify.component'

describe('PageAccountVerifyComponent', () => {
    let component: PageAccountVerifyComponent
    let fixture: ComponentFixture<PageAccountVerifyComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAccountVerifyComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAccountVerifyComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
