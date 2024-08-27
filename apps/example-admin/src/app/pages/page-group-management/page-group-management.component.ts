import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { GroupApiService } from '@myorg/app-example-api-services'
import { GroupDto } from '@myorg/app-example-models'

@Component({
    selector: 'app-page-group-management',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './page-group-management.component.html',
    styleUrl: './page-group-management.component.css',
})
export class PageGroupManagementComponent {
    private groupApiService = inject(GroupApiService)

    groups = signal<GroupDto[]>([])
    loading = true
    currentPage = 1
    totalPages = 1

    showEditModal = false
    showDeleteModal = false
    selectedGroup: GroupDto | null = null

    ngOnInit() {
        this.fetchGroups()
        console.log(this.selectedGroup)
    }

    fetchGroups(page: number = this.currentPage) {
        this.loading = true
        this.groupApiService.getAllGroups({ page, pageSize: 10 }).subscribe({
            next: (response: ApiResponse<any[]>) => {
                console.log('group response', response)
                this.groups.set(response.data ?? [])
                this.totalPages =
                    (response?.meta?.['totalPages'] as number) || 1
                this.currentPage = response?.meta?.page || page
                this.loading = false
            },
            error: (error: any) => {
                console.error('Error fetching Groups:', error)
                this.loading = false
            },
            complete: () => {
                console.log('Group fetching completed.')
            },
        })
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.fetchGroups(page)
        }
    }

    openEditModal(group: GroupDto) {
        this.selectedGroup = { ...group }
        this.showEditModal = true
    }

    closeEditModal() {
        this.showEditModal = false
        this.selectedGroup = null
    }

    onSubmitEditForm() {
        if (this.selectedGroup) {
            this.groupApiService
                .updateGroup(this.selectedGroup.id, this.selectedGroup)
                .subscribe({
                    next: () => {
                        this.fetchGroups()
                        this.closeEditModal()
                    },
                    error: (error) => {
                        console.error('Error updating user:', error)
                    },
                })
        }
    }

    openDeleteModal(group: GroupDto) {
        this.selectedGroup = group
        this.showDeleteModal = true
    }

    closeDeleteModal() {
        this.showDeleteModal = false
        this.selectedGroup = null
    }

    confirmDeleteUser() {
        if (this.selectedGroup) {
            this.groupApiService.deleteGroup(this.selectedGroup.id).subscribe({
                next: () => {
                    this.fetchGroups()
                    this.closeDeleteModal()
                },
                error: (error) => {
                    console.error('Error deleting user:', error)
                },
            })
        }
    }
}
