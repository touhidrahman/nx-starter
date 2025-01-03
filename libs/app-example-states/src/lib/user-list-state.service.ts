import { Injectable } from '@angular/core'
import { UserApiService } from '@myorg/app-example-api-services'
import { AuthStateService } from '@myorg/app-example-auth'
import { User } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'
import { combineLatest, debounceTime, map, switchMap, tap } from 'rxjs'

export interface UserListState {
    loadedUsers: User[]
    users: User[]
    sortDirection: -1 | 1 | 0
    sortField: keyof User | ''
    searchTerm: string
    searchField: { [Key: string]: string } | null
    loading: boolean
}

export const initialUserListState: UserListState = {
    loadedUsers: [],
    users: [],
    sortDirection: 0,
    sortField: '',
    searchTerm: '',
    searchField: null,
    loading: true,
}

@Injectable({
    providedIn: 'root',
})
export class UserListStateService extends SimpleStore<UserListState> {
    constructor(
        private userApiService: UserApiService,
        private authStateService: AuthStateService,
    ) {
        super(initialUserListState)
        this.init()
    }

    init() {
        this.loadUsers()
        this.continueFilteringUsers()
    }

    updateUserInState(user: User) {
        const users = this.getState().users
        const index = users.findIndex((u) => u.id === user.id)
        if (index === -1) return

        users[index] = user
        this.setState({ users: users })
    }

    getUsersByRole(role: string) {
        return this.select('loadedUsers').pipe(
            map((users) => users.filter((u) => u.role === role)),
        )
    }

    private loadUsers() {
        this.setState({ loading: true })
        this.userApiService.find({}).subscribe({
            next: ({ data: users }) => {
                this.setState({
                    users: users,
                    loadedUsers: users,
                    loading: false,
                })
            },
        })
    }

    private continueFilteringUsers() {
        combineLatest([
            this.select('sortDirection'),
            this.select('sortField'),
            this.select('searchTerm'),
            this.select('searchField'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true })),
                switchMap(([sortDirection, sortField, search, searchField]) => {
                    return this.select('loadedUsers').pipe(
                        map((data) =>
                            this.sortResults(data, sortField, sortDirection),
                        ),
                        map((data) => this.filterResults(data, searchField)),
                        map((data) => this.searchInResults(data, search)),
                    )
                }),
            )
            .subscribe({
                next: (users) => {
                    this.setState({ users: users, loading: false })
                },
            })
    }

    private sortResults(
        users: User[],
        sortField: keyof User | '',
        sortDirection: -1 | 0 | 1,
    ) {
        if (!sortField) return users

        return users.sort((a, b) => {
            const x = a[sortField]
            const y = b[sortField]
            if (sortField && x && y) {
                if (x < y) {
                    return -1 * sortDirection
                }
                if (x > y) {
                    return 1 * sortDirection
                }
            }
            return 0
        })
    }

    private filterResults(
        data: User[],
        searchField: { [Key: string]: string } | null,
    ) {
        if (!searchField || !Object.keys(data).length) return data

        return data.filter((obj) => {
            for (const key in searchField) {
                if (searchField[key] !== (obj as any)[key]) {
                    return false
                }
            }
            return true
        })
    }

    private searchInResults(data: User[], search: string) {
        if (!search) return data

        return data.filter((obj) => {
            for (const key in obj) {
                if ((obj as any)[key].toString().startsWith(search)) {
                    return true
                }
            }
            return false
        })
    }
}
