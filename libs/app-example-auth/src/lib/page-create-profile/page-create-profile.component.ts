import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'myorg-page-create-profile',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './page-create-profile.component.html',
    styleUrl: './page-create-profile.component.css',
})
export class PageCreateProfileComponent {}
