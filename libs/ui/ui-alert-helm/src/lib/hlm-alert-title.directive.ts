import { Directive, computed, input } from '@angular/core'
import { hlm } from '@spartan-ng/ui-core'
import { VariantProps, cva } from 'class-variance-authority'
import { ClassValue } from 'clsx'

export const alertTitleVariants = cva(
    'mb-1 font-medium leading-none tracking-tight',
    {
        variants: {},
    },
)
export type AlertTitleVariants = VariantProps<typeof alertTitleVariants>

@Directive({
    selector: '[hlmAlertTitle]',
    standalone: true,
    host: {
        '[class]': '_computedClass()',
    },
})
export class HlmAlertTitleDirective {
    readonly _userClass = input<ClassValue>('', { alias: 'class' })
    protected _computedClass = computed(() =>
        hlm(alertTitleVariants(), this._userClass()),
    )
}
