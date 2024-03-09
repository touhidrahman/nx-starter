import { Injectable } from '@angular/core'
import { ProfileApiService } from '@myorg/app-example-api-services'
import { SimpleStore } from '@myorg/store'
import { take } from 'rxjs'

export interface ProfileState {
    profilePicUrlMap: Map<string, string>
}

const initialState: ProfileState = {
    profilePicUrlMap: new Map<string, string>(),
}

@Injectable({
    providedIn: 'root',
})
export class ProfileStateService extends SimpleStore<ProfileState> {
    constructor(private profileApiService: ProfileApiService) {
        super(initialState)
    }

    saveProfilePicInStore(imageIdentifier: string) {
        this.profileApiService
            .getProfilePic(imageIdentifier)
            .pipe(take(1))
            .subscribe((res: { image_url: string }) => {
                this.setState({
                    profilePicUrlMap: this.getState().profilePicUrlMap.set(
                        imageIdentifier,
                        res.image_url,
                    ),
                })
            })
    }

    getProfilePicFromStore(imageIdentifier: string): string {
        if (!this.getState().profilePicUrlMap.has(imageIdentifier)) {
            this.saveProfilePicInStore(imageIdentifier)
        }
        return this.getState().profilePicUrlMap.get(imageIdentifier)
    }
}
