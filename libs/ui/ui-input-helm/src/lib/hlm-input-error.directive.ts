import { Directive, computed, input } from '@angular/core'
import { hlm } from '@spartan-ng/ui-core'
import { VariantProps, cva } from 'class-variance-authority'
import { ClassValue } from 'clsx'

export const inputErrorVariants = cva('text-destructive text-sm font-medium', {
    variants: {},
    defaultVariants: {},
})
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>

@Directive({
    selector: '[hlmInputError]',
    standalone: true,
    host: {
        '[class]': '_computedClass()',
    },
})
export class HlmInputErrorDirective {
    readonly _userClass = input<ClassValue>('', { alias: 'class' })
    protected _computedClass = computed(() =>
        hlm(inputErrorVariants(), this._userClass()),
    )
}
