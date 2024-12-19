import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-lawyer-search',
    imports: [CommonModule],
    templateUrl: './lawyer-search.component.html',
    styleUrl: './lawyer-search.component.scss'
})
export class LawyerSearchComponent {
    onInputFocus(customPlaceHolder: HTMLSpanElement) {
        customPlaceHolder.classList.add('hidden')
    }
    onBlur(customPlaceHolder: HTMLSpanElement, inputFeild: HTMLInputElement) {
        if (inputFeild.value) {
            return
        } else {
            customPlaceHolder.classList.remove('hidden')
        }
    }
}
