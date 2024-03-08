import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'filter',
    standalone: true,
})
export class FilterPipe<T> implements PipeTransform {
    transform(items: T[], filter: Record<string, T>): T[] {
        if (!items || !filter) {
            return items
        }

        const key = Object.keys(filter)[0]
        const value = filter[key]

        return items.filter((e) => e[key].indexOf(value) !== -1)
    }
}
