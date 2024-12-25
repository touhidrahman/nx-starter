import { style } from '@angular/animations'
import { Component, viewChild, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule, IonText, IonItem, IonRow, IonInput } from '@ionic/angular'

@Component({
    selector: 'myorg-page-lawyer-organization',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-lawyer-organization.component.html',
    styleUrl: './page-lawyer-organization.component.scss',
})
export class PageLawyerOrganizationComponent {
    toggleFocus(
        placeholder: IonText,
        inputWrapper: IonItem,
        isFocused: boolean,
    ) {
        const placeholderElement = (placeholder as any).el
        const inputWrapperElement = (inputWrapper as any).el

        if (placeholderElement) {
            placeholderElement.style.display = isFocused ? 'none' : 'flex'
        }

        if (inputWrapperElement) {
            inputWrapperElement.style.border = isFocused
                ? '1px solid rgba(75, 71, 71, 0.295)'
                : '1px solid transparent'
        }
    }

    triggerFocusEventOnInput(inputRow: IonRow) {
        const nativeElement = (inputRow as any).el
        if (nativeElement) {
            const inputElement = nativeElement.querySelector('ion-input')
            if (inputElement) {
                const event = new FocusEvent('focusin', {
                    bubbles: true,
                    cancelable: true,
                })
                inputElement.dispatchEvent(event)
                inputElement.focus()
            }
        }
    }
}
