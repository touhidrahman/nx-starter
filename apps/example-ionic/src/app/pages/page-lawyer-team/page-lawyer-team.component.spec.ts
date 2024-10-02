import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageLawyerTeamComponent } from './page-lawyer-team.component'

describe('PageLawyerTeamComponent', () => {
    let component: PageLawyerTeamComponent
    let fixture: ComponentFixture<PageLawyerTeamComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageLawyerTeamComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageLawyerTeamComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
