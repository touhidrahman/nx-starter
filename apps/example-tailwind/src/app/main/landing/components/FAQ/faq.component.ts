import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SectionTitleComponent } from './../../utils/section-title/section-title.component'
@Component({
    selector: 'app-faq',
    imports: [CommonModule, SectionTitleComponent],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
})
export class FaqComponent {
    showFaqAns(
        faqAns: HTMLDivElement,
        minus: HTMLSpanElement,
        plus: HTMLSpanElement,
    ) {
        faqAns.classList.toggle('h-24')
        faqAns.classList.toggle('h-0')
        minus.classList.toggle('hidden')
        plus.classList.toggle('hidden')
    }
}
