import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppExampleCommonComponent } from './app-example-common.component'

describe('AppExampleCommonComponent', () => {
    let component: AppExampleCommonComponent
    let fixture: ComponentFixture<AppExampleCommonComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppExampleCommonComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AppExampleCommonComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
