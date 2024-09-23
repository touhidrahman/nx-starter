import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageWelcome2Component } from './page-welcome2.component'

describe('PageWelcome2Component', () => {
    let component: PageWelcome2Component
    let fixture: ComponentFixture<PageWelcome2Component>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageWelcome2Component],
        }).compileComponents()

        fixture = TestBed.createComponent(PageWelcome2Component)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
