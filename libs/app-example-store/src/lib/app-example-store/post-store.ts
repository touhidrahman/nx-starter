import { PostApiService } from '@myorg/app-example-api-services'
import { signalStore, withHooks } from '@ngrx/signals'
import { withLocalStorageSync } from './with-local-storage-sync'
import { withPagedEntities } from './with-paged-entities'

export const PostsStore = signalStore(
    { providedIn: 'root' },

    withPagedEntities(PostApiService),
    withLocalStorageSync('posts'),
    withHooks({
        onInit(store) {
            if (store.loadFromLocalStorage()) {
                return
            }
            store.load(1)
        },
    }),
)
