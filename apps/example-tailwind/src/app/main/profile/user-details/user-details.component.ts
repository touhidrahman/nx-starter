import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-user-details',
    imports: [CommonModule],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {}
