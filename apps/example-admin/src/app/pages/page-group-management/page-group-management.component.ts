import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApiResponse } from '@myorg/common-models'
import { RouterLink } from '@angular/router'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { GroupApiService } from '@myorg/app-example-api-services'
import { GroupDto, GroupType } from '@myorg/app-example-models'

@Component({
    selector: 'app-page-group-management',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './page-group-management.component.html',
    styleUrl: './page-group-management.component.css',
})
export class PageGroupManagementComponent {
    private groupApiService = inject(GroupApiService)
    private fb = inject(FormBuilder)

    groups = signal<GroupDto[]>([])
    loading = true
    currentPage = 1
    totalPages = 1
    groupTypes = Object.values(GroupType)

    showEditModal = false
    showDeleteModal = false
    selectedGroup: GroupDto | null = null
    showCreateModal: boolean = false
    createGroupForm: FormGroup = new FormGroup({})

    ngOnInit() {
        this.fetchGroups()
        this.initCreateForm()
    }

    fetchGroups(page: number = this.currentPage) {
        this.loading = true
        this.groupApiService.getAllGroups({ page, pageSize: 10 }).subscribe({
            next: (response: ApiResponse<GroupDto[]>) => {
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
            const { id } = this.selectedGroup

            const data: GroupDto = {
                id: this.selectedGroup.id,
                name: this.selectedGroup.name,
                type: this.selectedGroup.type,
                email: this.selectedGroup.email,
                phone: this.selectedGroup.phone,
                city: this.selectedGroup.city,
                country: this.selectedGroup.country,
                postcode: this.selectedGroup.postcode,
                address: this.selectedGroup.address,
                updatedAt: new Date(),
                createdAt: new Date(),
            }
            data.id
                ? this.groupApiService.updateGroup(data.id, data).subscribe({
                      next: () => {
                          this.fetchGroups()
                          this.closeEditModal()
                      },
                      error: (error) => {
                          console.error('Error updating user:', error)
                      },
                  })
                : ''
        }
    }

    openDeleteModal(group: GroupDto) {
        this.selectedGroup = { ...group }
        this.showDeleteModal = true
    }

    closeDeleteModal() {
        this.showDeleteModal = false
        this.selectedGroup = null
    }

    confirmDeleteUser() {
        if (this.selectedGroup) {
            this.groupApiService.deleteGroup(3).subscribe({
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

    openCreateGroupModal() {
        this.showCreateModal = true
    }

    closeCreateModal() {
        this.showCreateModal = false
        this.selectedGroup = null
    }

    onSubmitGroupCreateForm() {
        console.log(this.createGroupForm.value)
        this.groupApiService.createGroup(this.createGroupForm.value).subscribe({
            next: (val) => {
                this.closeCreateModal()
                this.fetchGroups()
                console.log(val)
            },
            error: (err) => {
                this.closeCreateModal()
                this.fetchGroups()
                console.log(err.error)
            },
        })
    }

    initCreateForm() {
        this.createGroupForm = this.fb.group({
            name: [],
            type: [],
            email: [],
            phone: [],
            postCode: [],
            city: [],
            address: [],
            country: [],
        })
    }
}
