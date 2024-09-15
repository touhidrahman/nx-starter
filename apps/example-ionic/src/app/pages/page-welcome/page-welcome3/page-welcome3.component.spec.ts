import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageWelcome3Component } from './page-welcome3.component'

describe('PageWelcome3Component', () => {
    let component: PageWelcome3Component
    let fixture: ComponentFixture<PageWelcome3Component>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageWelcome3Component],
        }).compileComponents()

        fixture = TestBed.createComponent(PageWelcome3Component)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
