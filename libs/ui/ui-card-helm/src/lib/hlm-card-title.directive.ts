import { Directive, computed, input } from '@angular/core'
import { hlm } from '@spartan-ng/ui-core'
import { VariantProps, cva } from 'class-variance-authority'
import { ClassValue } from 'clsx'

export const cardTitleVariants = cva(
    'text-lg font-semibold leading-none tracking-tight',
    {
        variants: {},
        defaultVariants: {},
    },
)
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>

@Directive({
    selector: '[hlmCardTitle]',
    standalone: true,
    host: {
        '[class]': '_computedClass()',
    },
})
export class HlmCardTitleDirective {
    readonly _userClass = input<ClassValue>('', { alias: 'class' })
    protected _computedClass = computed(() =>
        hlm(cardTitleVariants(), this._userClass()),
    )
}
