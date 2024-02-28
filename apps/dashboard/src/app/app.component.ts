import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent],
    selector: 'jsat-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
