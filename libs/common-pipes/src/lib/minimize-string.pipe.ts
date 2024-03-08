import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'minimizeString',
    standalone: true,
})
export class MinimizeStringPipe implements PipeTransform {
    transform(value: string, length: number, ...args: unknown[]): string {
        if (value.length > length) {
            return value.toString().substring(0, length)
        }
        return value
    }
}
