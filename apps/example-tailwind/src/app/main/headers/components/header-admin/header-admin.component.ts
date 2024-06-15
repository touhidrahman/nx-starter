import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { LucideAngularModule } from 'lucide-angular'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-admin',
    standalone: true,
    imports: [CommonModule, ...SpartanModules, LucideAngularModule,HlmInputDirective,RouterModule],
    templateUrl: './header-admin.component.html',
    styleUrl: './header-admin.component.scss',
})
export class HeaderAdminComponent {}
