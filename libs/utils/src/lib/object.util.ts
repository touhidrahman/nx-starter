import { Params } from '@angular/router'
import qs from 'qs'
import { shake } from 'radash'

/** Get a stringified version of an object with keys sorted alphabetically */
export function stringifyObjectWithKeysSorted(queryParams: Params) {
    return qs.stringify(shake(queryParams), {
        encode: false,
        sort: (a, b) => a.localeCompare(b),
    })
}
