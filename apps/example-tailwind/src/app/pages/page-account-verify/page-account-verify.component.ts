import { Component, inject, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthApiService } from '@myorg/common-auth'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-page-account-verify',
    standalone: true,
    imports: [CommonModule, RouterModule, ...SpartanModules],
    templateUrl: './page-account-verify.component.html',
    styleUrl: './page-account-verify.component.scss',
})
export class PageAccountVerifyComponent {
    private authApiService = inject(AuthApiService)
    verified = false

    token = input<string>('') // from url

    ngOnInit(): void {
        this.authApiService
            .verifyEmail(this.token())
            .pipe()
            .subscribe({
                next: (res) => {
                    this.verified = true
                },
            })
    }
}
