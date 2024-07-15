import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogApprovalComponent } from './dialog-approval.component'

describe('DialogApprovalComponent', () => {
    let component: DialogApprovalComponent
    let fixture: ComponentFixture<DialogApprovalComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogApprovalComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DialogApprovalComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
