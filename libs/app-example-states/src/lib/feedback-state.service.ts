import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { FeedbackApiService } from '@myorg/app-example-api-services'
import { AuthStateService } from '@myorg/app-example-auth'
import { maxFilesLength } from '@myorg/app-example-forms'
import { FeedbackOptionRadioItem, FEEDBACK_OPTIONS, User } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'
import { FeedbackType } from 'libs/app-example-models/src/lib/feedback-type.enum'
import { debounceTime, finalize } from 'rxjs'

export interface FeedbackState {
    activePage: string
    user: Partial<User> | null
    feedbackText: string
    feedbackType: FeedbackType
    attachments: File[]
}

const initialState: FeedbackState = {
    activePage: '',
    user: null,
    feedbackText: '',
    feedbackType: FeedbackType.Bug,
    attachments: [],
}

@Injectable({
    providedIn: 'root',
})
export class FeedbackStateService extends SimpleStore<FeedbackState> {
    feedbackOptions: FeedbackOptionRadioItem[] = FEEDBACK_OPTIONS

    feedbackForm: FormGroup = new FormGroup({
        feedbackType: new FormControl<FeedbackOptionRadioItem>(this.feedbackOptions[0], [
            Validators.required,
        ]),
        feedbackText: new FormControl<string>('', [Validators.required, Validators.minLength(15)]),
        attachments: new FormControl<File[]>([], [maxFilesLength(5)]),
    })

    get hasTextareaMinLengthError() {
        return this.feedbackForm.get('feedbackText')?.hasError('minlength')
    }

    constructor(
        private router: Router,
        private feedbackApiService: FeedbackApiService,
        private authStateService: AuthStateService,
    ) {
        super(initialState)
    }

    init() {
        this.continueSettingActivePage()
        this.syncFormValueToState()
    }

    submitFeedback() {
        if (this.feedbackForm.invalid) {
            throw new Error('Please fill in the required fields.')
        }

        this.setState({
            user: this.authStateService.getState().user,
            attachments: this.feedbackForm.get('attachments')?.value,
        })

        return this.feedbackApiService
            .sendFeedback({
                activePage: this.getState().activePage,
                feedbackText: this.getState().feedbackText,
                feedbackType: this.getState().feedbackType,
                userId: this.getState().user?.id ?? '',
                attachments: this.getState().attachments,
            })
            .pipe(finalize(() => this.feedbackForm.reset()))
    }

    private syncFormValueToState() {
        this.feedbackForm.valueChanges.pipe(debounceTime(300)).subscribe({
            next: (value) => {
                this.setState({
                    feedbackText: value.feedbackText,
                    feedbackType: value.feedbackType?.value,
                    attachments: value.attachments,
                })
            },
        })
    }

    private continueSettingActivePage() {
        this.router.events.subscribe({
            next: (params) => this.setState({ activePage: this.router.url }),
        })
    }
}
