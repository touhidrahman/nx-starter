import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-download-app',
    standalone: true,
    imports: [],
    templateUrl: './download-app.component.html',
    styleUrl: './download-app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadAppComponent {}
