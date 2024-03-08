import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'msToTime',
    standalone: true,
})
export class MsToTimePipe implements PipeTransform {
    transform(miliseconds: number | string, format: string): any {
        const ms = Number(miliseconds)
        const hours: number = Math.floor(ms / 3600000)
        const minutes: number = Math.floor((ms % 3600000) / 60000)

        const hoursStr = hours > 0 ? `${+hours}` : ''
        const minutesStr: string = minutes > 0 ? `${+minutes}` : ''

        if (format === 'min') {
            return `${minutesStr}`
        }
        return `${Number(hoursStr)}`
    }

    // transform(ms: number): string {
    //   let minutes: number = Math.floor((ms / 1000 / 60) % 60);
    //   let hours: number = Math.floor(ms / 1000 / 60 / 60);

    //   let hoursStr: string = hours > 0 ? `${hours} hr` : '-';
    //   let minutesStr: string = minutes > 0 ? `${minutes} min` : '';

    //   return `${hoursStr} ${minutesStr}`;

    // }
}
