import { InjectionToken } from '@angular/core'
import { AppValidationEnvironment } from './app-validation-environment.model'

/**
 * Injection token for the validation app environment
 */
export const APP_VALIDATION_ENVIRONMENT =
    new InjectionToken<AppValidationEnvironment>('ENVIRONMENT')
