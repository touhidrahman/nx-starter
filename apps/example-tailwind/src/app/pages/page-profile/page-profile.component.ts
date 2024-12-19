import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLinkActive, RouterModule } from '@angular/router'
import { ChangePasswordFormService } from '@myorg/common-auth'
import { userRoute, UserRoute } from './user-route-data'

@Component({
    selector: 'app-page-profile',
    imports: [CommonModule, RouterModule, RouterLinkActive],
    templateUrl: './page-profile.component.html',
    styleUrl: './page-profile.component.scss',
    providers: [ChangePasswordFormService]
})
export class PageProfileComponent {
    userRoute: UserRoute[] = userRoute
}
