import { AbstractControl, ValidatorFn } from '@angular/forms'

export function maxFilesLength(maxLength: number): ValidatorFn {
    return ({ value }: AbstractControl) =>
        value.length > maxLength
            ? {
                  maxLength:`Error: maximum limit - ${maxLength} files for upload`,
              }
            : null
}
