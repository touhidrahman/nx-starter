import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { UserApiService } from '@myorg/app-example-api-services'
import { User } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { SpartanModules } from '@myorg/spartan-modules'
import { lucideCalendarDays, lucideMapPin } from '@ng-icons/lucide'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'
import { LucideAngularModule } from 'lucide-angular'

@Component({
    selector: 'app-page-dashboard-home',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        HlmIconComponent,
        LucideAngularModule,
    ],
    templateUrl: './page-dashboard-home.component.html',
    styleUrls: ['./page-dashboard-home.component.scss'],
    providers: [provideIcons({ lucideCalendarDays, lucideMapPin })],
})
export class PageDashboardHomeComponent implements OnInit {
    users: User[] = []
    loading = true
    currentPage = 1
    totalPages = 1

    constructor(private userService: UserApiService) {}

    ngOnInit() {
        this.userService.useAdminEndpoint()
        this.fetchUsers()
    }

    fetchUsers(page: number = this.currentPage) {
        this.loading = true
        this.userService.getUsers({ page, pageSize: 10 }).subscribe({
            next: (response: ApiResponse<User[]>) => {
                this.users = response?.data as User[]
                this.totalPages =
                    (response?.meta?.['totalPages'] as number) || 1
                this.currentPage = response?.meta?.page || page
                this.loading = false
            },
            error: (error: any) => {
                console.error('Error fetching users:', error)
                this.loading = false
            },
            complete: () => {
                console.log('User fetching completed.')
            },
        })
    }

    editUser(user: User) {
        console.log('Editing user:', user)
        // Implement the edit logic here
    }

    toggleUserStatus(user: User) {
        user.verified = !user.verified
        console.log('Toggling status for user:', user)
        // Implement the status toggle logic here, such as making an API call
    }

    deleteUser(user: User) {
        console.log('Deleting user:', user)
        // Implement the delete logic here
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.fetchUsers(page)
        }
    }
}
