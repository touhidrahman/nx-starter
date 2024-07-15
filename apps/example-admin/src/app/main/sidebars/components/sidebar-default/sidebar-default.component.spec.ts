import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SidebarDefaultComponent } from './sidebar-default.component'

describe('SidebarDefaultComponent', () => {
    let component: SidebarDefaultComponent
    let fixture: ComponentFixture<SidebarDefaultComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarDefaultComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SidebarDefaultComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
