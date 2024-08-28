import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
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
        ...SpartanModules,
        HlmIconComponent,
        LucideAngularModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './page-dashboard-home.component.html',
    styleUrls: ['./page-dashboard-home.component.scss'],
    providers: [provideIcons({ lucideCalendarDays, lucideMapPin })],
})
export class PageDashboardHomeComponent implements OnInit {
    private userService = inject(UserApiService)

    users: User[] = []
    loading = true
    currentPage = 1
    totalPages = 1

    showEditModal = false
    showDeleteModal = false
    selectedUser: User | null = null

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

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.fetchUsers(page)
        }
    }

    openEditModal(user: User) {
        this.selectedUser = { ...user }
        this.showEditModal = true
    }

    closeEditModal() {
        this.showEditModal = false
        this.selectedUser = null
    }

    onSubmitEditForm() {
        if (this.selectedUser) {
            //   this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
            //     next: () => {
            //       this.fetchUsers();
            //       this.closeEditModal();
            //     },
            //     error: (error) => {
            //       console.error('Error updating user:', error);
            //     },
            //   });
        }
    }

    openDeleteModal(user: User) {
        this.selectedUser = user
        this.showDeleteModal = true
    }

    closeDeleteModal() {
        this.showDeleteModal = false
        this.selectedUser = null
    }

    confirmDeleteUser() {
        if (this.selectedUser) {
            //   this.userService.deleteUser(this.selectedUser.id).subscribe({
            //     next: () => {
            //       this.fetchUsers();
            //       this.closeDeleteModal();
            //     },
            //     error: (error) => {
            //       console.error('Error deleting user:', error);
            //     },
            //   });
        }
    }
}
