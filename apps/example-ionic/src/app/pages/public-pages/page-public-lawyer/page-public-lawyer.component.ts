import { IonicModule, IonText, IonItem, IonRow } from '@ionic/angular'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'myorg-page-public-lawyer',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-public-lawyer.component.html',
    styleUrl: './page-public-lawyer.component.scss',
})
export class PagePublicLawyerComponent {
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
