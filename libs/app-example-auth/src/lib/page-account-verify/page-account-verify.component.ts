import { Component, inject, input, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthApiService } from '@myorg/common-auth'

@Component({
    selector: 'app-page-account-verify',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './page-account-verify.component.html',
    styleUrl: './page-account-verify.component.scss',
})
export class PageAccountVerifyComponent implements OnInit {
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
