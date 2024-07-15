import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageAccountVerifiedComponent } from './page-account-verified.component'

describe('PageAccountVerifiedComponent', () => {
    let component: PageAccountVerifiedComponent
    let fixture: ComponentFixture<PageAccountVerifiedComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageAccountVerifiedComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageAccountVerifiedComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
