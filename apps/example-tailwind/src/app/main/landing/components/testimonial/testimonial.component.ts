import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SectionTitleComponent } from '../../utils/section-title/section-title.component'
@Component({
    selector: 'app-testimonial',
    imports: [CommonModule, SectionTitleComponent],
    templateUrl: './testimonial.component.html',
    styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {}
