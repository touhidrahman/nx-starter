import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { LucideAngularModule } from 'lucide-angular'

@Component({
    selector: 'app-header-default',
    standalone: true,
    imports: [CommonModule, ...SpartanModules, LucideAngularModule],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss',
})
export class HeaderDefaultComponent {}
