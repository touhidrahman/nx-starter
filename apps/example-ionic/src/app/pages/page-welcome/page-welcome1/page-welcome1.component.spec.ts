import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageWelcome1Component } from './page-welcome1.component'

describe('PageWelcome1Component', () => {
    let component: PageWelcome1Component
    let fixture: ComponentFixture<PageWelcome1Component>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageWelcome1Component],
        }).compileComponents()

        fixture = TestBed.createComponent(PageWelcome1Component)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
