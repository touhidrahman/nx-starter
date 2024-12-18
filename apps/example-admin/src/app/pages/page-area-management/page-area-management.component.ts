import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {
    Area,
    Permission,
    USER_ROLES,
    UserPermissions,
    UserRole,
} from '@myorg/app-example-models'
import { AreaApiService } from '@myorg/app-example-api-services'
import { ApiResponse } from '@myorg/common-models'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-area-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModules],
    templateUrl: './page-area-management.component.html',
    styleUrl: './page-area-management.component.scss',
})
export class PageAreaManagementComponent implements OnInit {
    visible = false

    showDialog() {
        this.visible = true
    }
    USER_ROLES = USER_ROLES
    dropDownOptions: object[] = []

    user = {
        type: UserRole.Owner, // Default value (optional)
    }

    loading = true
    showDeleteModal = false
    createAreaForm!: FormGroup

    constructor(
        private fb: FormBuilder,
        private areaApiService: AreaApiService,
    ) {}

    ngOnInit(): void {
        USER_ROLES.forEach((e) => {
            const obj = { name: e.value }
            this.dropDownOptions.push(obj)
        })
        this.initializeForm()
    }

    private initializeForm(): void {
        this.createAreaForm = this.fb.group({
            areaName: ['', Validators.required],
            description: [''],
        })
    }

    onSubmit(): void {
        if (this.createAreaForm.valid) {
            const areaData: Area = this.createAreaForm.value
            this.areaApiService.createApplicationArea(areaData).subscribe({
                next: (response: ApiResponse<Area[]>) => {
                    if (response.code === 200) {
                        console.log('Area created successfully:', response.data)
                    } else {
                        console.warn('Unexpected response code:', response.code)
                    }
                },
                error: (err) => {
                    console.error('Error creating area:', err)
                },
            })
        } else {
            console.warn('Form is invalid')
        }
    }

    userPermissions: UserPermissions = {
        advertisements: [Permission.Read, Permission.Write],
        advertisers: [Permission.Read],
        contents: [Permission.Read, Permission.Write, Permission.Delete],
        feedbacks: [],
        profile: [Permission.Read, Permission.Write],
        users: [Permission.Read],
    }

    // Extract the keys of UserPermissions as an array
    permissionKeys = Object.keys(
        this.userPermissions,
    ) as (keyof UserPermissions)[]

    // Enum for easy access in the template
    Permission = Permission

    permissions = [
        {
            name: 'Case',
            read: false,
            create: false,
            edit: false,
            delete: false,
            none: false,
        },
    ]

    openDeleteModal() {
        this.showDeleteModal = true
    }

    closeDeleteModal() {
        this.showDeleteModal = false
    }

    confirmDeleteUser() {
        // if () {
        //     //   this.userService.deleteUser(this.selectedUser.id).subscribe({
        //     //     next: () => {
        //     //       this.fetchUsers();
        //     //       this.closeDeleteModal();
        //     //     },
        //     //     error: (error) => {
        //     //       console.error('Error deleting user:', error);
        //     //     },
        //     //   });
        // }
    }
}
