import { InjectionToken } from '@angular/core'
import { AppExampleEnvironment } from './app-example-environment.model'

/**
 * Injection token for the validation app environment
 */
export const APP_EXAMPLE_ENVIRONMENT =
    new InjectionToken<AppExampleEnvironment>('ENVIRONMENT')
