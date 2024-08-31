import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'
import { lucideCheck, lucideCog, lucidePencil, lucideTrash2, lucideX  } from '@ng-icons/lucide'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain'
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-page-area-management',
    standalone: true,
    imports: [CommonModule, ...SpartanModules,HlmIconComponent, BrnSelectImports, HlmSelectImports , BrnDialogTriggerDirective,
        BrnDialogContentDirective,HlmDialogComponent,
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
    providers: [provideIcons({ lucideCheck , lucideX,lucideTrash2 ,lucideCog, lucidePencil })],
})
export class PageAreaManagementComponent {
    loading = true
    showDeleteModal = false
    private _formBuilder = inject(FormBuilder);

    form = this._formBuilder.group({
        name: ['', Validators.required],
    });

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
