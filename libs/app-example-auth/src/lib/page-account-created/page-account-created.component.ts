import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'myorg-page-account-created',
    imports: [RouterModule, PrimeModules],
    templateUrl: './page-account-created.component.html',
    styleUrl: './page-account-created.component.scss',
})
export class PageAccountCreatedComponent {}
