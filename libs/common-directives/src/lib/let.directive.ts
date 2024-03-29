import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
    selector: '[ngxLet]',
    standalone: true,
})
export class LetDirective {
    context = {
        $implicit: null,
        ngxLet: null,
    }

    constructor(
        private vcRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
    ) {
        this.vcRef.createEmbeddedView(this.templateRef, this.context)
    }

    @Input() set ngLet(expression: any) {
        this.context.$implicit = this.context.ngxLet = expression
    }
}
