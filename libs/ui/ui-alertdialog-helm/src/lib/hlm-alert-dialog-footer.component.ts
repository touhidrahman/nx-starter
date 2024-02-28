import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    computed,
    input,
} from '@angular/core'
import { hlm } from '@spartan-ng/ui-core'
import { ClassValue } from 'clsx'

@Component({
    selector: 'hlm-alert-dialog-footer',
    standalone: true,
    template: ` <ng-content /> `,
    host: {
        '[class]': '_computedClass()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class HlmAlertDialogFooterComponent {
    readonly _userClass = input<ClassValue>('', { alias: 'class' })
    protected readonly _computedClass = computed(() =>
        hlm(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            this._userClass(),
        ),
    )
}
