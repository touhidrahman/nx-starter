import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganazationTableComponent } from './organazation-table.component'

describe('OrganazationTableComponent', () => {
    let component: OrganazationTableComponent
    let fixture: ComponentFixture<OrganazationTableComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrganazationTableComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(OrganazationTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
