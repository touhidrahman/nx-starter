import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-admin',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header-admin.component.html',
    styleUrl: './header-admin.component.scss',
})
export class HeaderAdminComponent implements OnInit, OnDestroy {
    renderer: Renderer2 = inject(Renderer2)
    imageLoaded = true
    showProfileDropDown = false

    bodyClickListener: (() => void) | null = null
    showFallback(event: Event) {
        this.imageLoaded = false
        ;(event.target as HTMLElement).style.display = 'none'
    }

    ngOnInit() {
        this.bodyClickListener = this.renderer.listen(
            document.body,
            'click',
            (e: Event) => {
                const targetElement = e.target as HTMLElement
                if (targetElement.closest('#profileButton')) {
                    this.showProfileDropDown = !this.showProfileDropDown
                } else if (!targetElement.closest('#profileDropDown')) {
                    this.showProfileDropDown = false
                }
            },
        )
    }

    ngOnDestroy() {
        if (this.bodyClickListener) {
            this.bodyClickListener()
            this.bodyClickListener = null
        }
    }
}
