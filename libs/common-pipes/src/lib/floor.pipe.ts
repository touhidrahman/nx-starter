import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'floor',
    standalone: true,
})
export class FloorPipe implements PipeTransform {
    transform(value: number): number {
        return Math.floor(value)
    }
}
