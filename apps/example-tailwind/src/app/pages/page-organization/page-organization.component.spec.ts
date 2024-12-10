import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PageOrganizationComponent } from './page-organization.component'

describe('PageOrganizationComponent', () => {
    let component: PageOrganizationComponent
    let fixture: ComponentFixture<PageOrganizationComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageOrganizationComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PageOrganizationComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
