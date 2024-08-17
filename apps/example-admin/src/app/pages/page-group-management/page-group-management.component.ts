import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserApiService } from '@myorg/app-example-api-services'
import { User } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-page-group-management',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './page-group-management.component.html',
    styleUrl: './page-group-management.component.css',
})
export class PageGroupManagementComponent {
    users: User[] = []
    loading = true
    currentPage = 1
    totalPages = 1

    showEditModal = false
    showDeleteModal = false
    selectedUser: User | null = null

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
