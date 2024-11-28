import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditComponent {}
