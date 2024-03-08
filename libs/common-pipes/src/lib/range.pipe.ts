import { Pipe, type PipeTransform } from '@angular/core'
import { list } from 'radash'

@Pipe({
    name: 'range',
    standalone: true,
})
export class RangePipe implements PipeTransform {
    transform(value: number, startValue = 1): number[] {
        return value >= startValue ? list(startValue, value) : []
    }
}
