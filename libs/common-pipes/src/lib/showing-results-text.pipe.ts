import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
    name: 'showResultsText',
    standalone: true,
})
export class ShowingResultsTextPipe implements PipeTransform {
    transform(page: number, pageSize: number, totalResults: number): string {
        if (totalResults === 0) return 'No items found'
        if (totalResults === 1) return 'Showing 1 item'

        return `Showing ${this.calculateResultRange(
            page,
            pageSize,
            totalResults,
        )} of ${totalResults} items`
    }

    private calculateResultRange(page: number, pageSize: number, totalResults: number): string {
        const end = page * pageSize
        if (totalResults === 0) return '0 - 0'
        if (end > totalResults) return `1 - ${totalResults}`
        return `1 - ${end}`
    }
}
