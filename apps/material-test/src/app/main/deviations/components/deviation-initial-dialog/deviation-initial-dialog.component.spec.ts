import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DeviationInitialDialogComponent } from './deviation-initial-dialog.component'

describe('DeviationInitialDialogComponent', () => {
    let component: DeviationInitialDialogComponent
    let fixture: ComponentFixture<DeviationInitialDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeviationInitialDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DeviationInitialDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
