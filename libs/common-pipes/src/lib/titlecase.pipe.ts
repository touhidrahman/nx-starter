import { Pipe, type PipeTransform } from '@angular/core'
import { title } from 'radash'

@Pipe({
    name: 'titlecase',
    standalone: true,
})
export class TitlecasePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return title(value as string)
    }
}
