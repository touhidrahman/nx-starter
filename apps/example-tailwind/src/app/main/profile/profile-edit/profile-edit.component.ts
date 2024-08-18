import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [CommonModule, CommonModule, HlmInputDirective],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditComponent {}
