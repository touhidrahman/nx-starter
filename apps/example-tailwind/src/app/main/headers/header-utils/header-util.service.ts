import { Injectable } from '@angular/core'
import { UIstate } from './uiState-inteface'

@Injectable({
    providedIn: 'root',
})
export class HeaderUtilService {
    showFallbackText(event: Event, uiState: UIstate) {
        uiState.imageLoaded = false
        ;(event.target as HTMLElement).style.display = 'none'
    }

    toggleMoreOptions(
        moreOptionWrapper: HTMLDivElement,
        chevron: HTMLSpanElement,
    ) {
        moreOptionWrapper.classList.toggle('h-24')
        moreOptionWrapper.classList.toggle('h-0')
        chevron.classList.toggle('rotate-90')
    }

    toggleProfileMenu(e: Event, uiState: UIstate) {
        const targetElement = e.target as HTMLElement
        if (targetElement.closest('#profileButton')) {
            uiState.showProfileDropDown = !uiState.showProfileDropDown
        } else if (!targetElement.closest('#profileDropDown')) {
            uiState.showProfileDropDown = false
        }
    }
}
