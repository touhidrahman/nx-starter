import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'
import {
    lucideCheck,
    lucideCog,
    lucidePencil,
    lucideTrash2,
    lucideX,
} from '@ng-icons/lucide'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'
import {
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import {
    Area,
    Permission,
    USER_ROLES,
    UserPermissions,
    UserRole,
} from '@myorg/app-example-models'
import { AreaApiService } from '@myorg/app-example-api-services'
import { ApiResponse } from '@myorg/common-models'

@Component({
    selector: 'app-page-area-management',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        HlmIconComponent,
        BrnSelectImports,
        HlmSelectImports,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,
        FormsModule,
        HlmFormFieldModule,
        ReactiveFormsModule,
        HlmInputDirective,
    ],
    templateUrl: './page-area-management.component.html',
    styleUrl: './page-area-management.component.scss',
    providers: [
        provideIcons({
            lucideCheck,
            lucideX,
            lucideTrash2,
            lucideCog,
            lucidePencil,
        }),
    ],
})
export class PageAreaManagementComponent implements OnInit {
    USER_ROLES = USER_ROLES
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
