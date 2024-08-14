import { UserApiService } from '@myorg/app-example-api-services'
import { signalStore, withHooks } from '@ngrx/signals'
import { withLocalStorageSync } from './with-local-storage-sync'
import { withPagedEntities } from './with-paged-entities'

export const AdminUsersStore = signalStore(
    {
        providedIn: 'root',
    },

    withPagedEntities(UserApiService),
    withLocalStorageSync('adminUsers'),
    withHooks({
        onInit(store) {
            if (store.loadFromLocalStorage()) {
                return
            }
            store.load({ page: 1, pageSize: 10 })
        },
    }),
)
