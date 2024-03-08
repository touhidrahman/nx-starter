import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
    selector: '[appScrollable]',
    exportAs: 'appScrollable',
    standalone: true,
})
export class ScrollableDirective {
    @Input() scrollUnit: number

    constructor(private elementRef: ElementRef) {}
    private get element() {
        return this.elementRef.nativeElement
    }

    get isOverflow() {
        return this.element.scrollWidth > this.element.clientWidth
    }

    scroll(direction: number) {
        this.element.scrollLeft += this.scrollUnit * direction
    }

    get canScrollStart() {
        return this.element.scrollLeft > 0
    }

    get canScrollEnd() {
        return this.element.scrollLeft + this.element.clientWidth !== this.element.scrollWidth
    }

    @HostListener('window:resize')
    onWindowResize() {}
}
