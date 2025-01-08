import { inject, Injectable } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { Appointment } from '@myorg/app-example-models'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'
import { AppointmentApiService } from '@myorg/app-example-api-services'
import { AlertService } from '@myorg/app-example-core'

interface AppointmentState {
    appointments: Appointment[]
    selectedAppointment: Appointment | null
    loading: boolean
    search: string
    page: number
    size: number
    total: number
}

const initialState: AppointmentState = {
    appointments: [
        {
            vendorUserId: '23rf2',
            clientUserId: '3232',
            date: '23232',
            description: 'hello',
            endTimestamp: '2323232',
            notesForClient: 'sfsd',
            notesForVendor: 'sjkjjjjjj',
            createdAt: '2323',
            startTimestamp: '3432232',
            groupId: '2323',
            updatedAt: '232332',
            id: '1',
        },
    ],
    selectedAppointment: null,
    loading: false,
    search: '',
    page: 1,
    size: 10,
    total: 0,
}

@Injectable()
export class AppointmentStateService extends SimpleStore<any> {
    appointmentApiService = inject(AppointmentApiService)
    alertService = inject(AlertService)

    constructor() {
        super(initialState)
        this.init()
    }

    init() {
        this.continueLoadingAppointments()
    }

    private continueLoadingAppointments() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
            this.select('orderBy'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true })),
                switchMap(([search, page, size, orderBy]) => {
                    return this.appointmentApiService.getAll({
                        search,
                        page,
                        size,
                        orderBy,
                    })
                }),
            )
            .subscribe({
                next: ({ meta, data }) => {
                    this.setState({
                        loading: false,
                        appointments: data,
                        page: meta?.page,
                        size: meta?.size,
                        total: meta?.total,
                    })
                },
                error: (err) => {
                    this.setState({ loading: false })
                    this.alertService.error(err.error.message)
                },
            })
    }
}
