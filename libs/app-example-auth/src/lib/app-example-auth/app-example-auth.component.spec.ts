import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppExampleAuthComponent } from './app-example-auth.component'

describe('AppExampleAuthComponent', () => {
    let component: AppExampleAuthComponent
    let fixture: ComponentFixture<AppExampleAuthComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppExampleAuthComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AppExampleAuthComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
