import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageResetPasswordComponent } from './page-reset-password.component'

describe('PageResetPasswordComponent', () => {
    let component: PageResetPasswordComponent
    let fixture: ComponentFixture<PageResetPasswordComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageResetPasswordComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageResetPasswordComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
