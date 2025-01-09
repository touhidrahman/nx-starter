import { inject, Injectable } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { Appointment } from '@myorg/app-example-models'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'
import { AppointmentApiService } from '@myorg/app-example-api-services'
import { AlertService } from '@myorg/app-example-core'
import { AppointmentEditFormService } from '@myorg/app-example-forms'

interface AppointmentListState {
    appointments: Appointment[]
    selectedAppointment: Appointment | null
    loading: boolean
    search: string
    page: number
    orderBy: 'asc' | 'desc'
    size: number
    total: number
}

const initialState: AppointmentListState = {
    appointments: [],
    selectedAppointment: null,
    loading: false,
    search: '',
    page: 1,
    size: 10,
    total: 0,
    orderBy: 'desc'
}

@Injectable()
export class AppointmentListStateService extends SimpleStore<AppointmentListState> {
    appointmentApiService = inject(AppointmentApiService)
    appointmentEditFormService = inject(AppointmentEditFormService)
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
                        total: meta?.total,
                    })
                },
                error: (err) => {
                    this.setState({ loading: false })
                    this.alertService.error(err.error.message)
                },
            })
    }

    saveAppointment() {
        this.setState({loading : true})
        const {appointments} = this.getState()
        this.appointmentEditFormService.save$().subscribe({
            next: (value) => {
                this.setState({
                    appointments: [...appointments, value],
                    loading: false
                })
                this.alertService.success('Appointment created successfully')
            },
            error: (err) => {
                this.setState({
                    loading: false
                })
                this.alertService.error(err.error.message)
            },
        })
    }
}
