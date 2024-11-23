import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageClientTeamComponent } from './page-client-team.component'

describe('PageClientTeamComponent', () => {
    let component: PageClientTeamComponent
    let fixture: ComponentFixture<PageClientTeamComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageClientTeamComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageClientTeamComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
