import { Injectable } from '@angular/core'
import { UserApiService } from '@myorg/app-example-api-services'
import { MemberRegisterRequest, User } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'

export interface UserManagementState {
    users: User[]
    joinRequests: MemberRegisterRequest[]
}

export const initialUserManagementState: UserManagementState = {
    users: [],
    joinRequests: [],
}

@Injectable({
    providedIn: 'root',
})
export class UserManagementStateService extends SimpleStore<UserManagementState> {
    constructor(
        private userApiService: UserApiService,
    ) {
        super(initialUserManagementState)
    }

    loadJoinRequests(organizationId: string) {
        this.userApiService.getUnapprovedUsers(organizationId).subscribe({
            next: ({ data: joinRequests }) => {
                this.setState({ joinRequests })
            },
        })
    }

    loadUsers(organizationId: string) {
        this.userApiService.find({ organizationId }).subscribe({
            next: ({ data: users }) => {
                this.setState({ users })
            },
        })
    }
}
