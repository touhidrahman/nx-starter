import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ValidationTestLinksComponent } from './validation-test-links.component'

describe('ValidationTestLinksComponent', () => {
    let component: ValidationTestLinksComponent
    let fixture: ComponentFixture<ValidationTestLinksComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValidationTestLinksComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ValidationTestLinksComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
