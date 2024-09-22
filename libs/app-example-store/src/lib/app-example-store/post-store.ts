import { signalStore, withHooks } from '@ngrx/signals'
import { withLocalStorageSync } from './with-local-storage-sync'

export const PostsStore = signalStore(
    { providedIn: 'root', protectedState: false },

    // withPagedEntities(PostApiService),
    withLocalStorageSync('posts'),
    withHooks({
        onInit(store) {
            if (store.loadFromLocalStorage()) {
                return
            }
            // store.load(1)
        },
    }),
)
