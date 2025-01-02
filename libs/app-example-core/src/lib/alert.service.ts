import { inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { toast } from 'ngx-sonner'

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private messageService = inject(MessageService)

    success(message: string) {
        this.messageService.add({ text: message, severity: 'success' })
    }

    error(message: string) {
        this.messageService.add({ text: message, severity: 'error' })
    }

    info(message: string) {
        this.messageService.add({ text: message, severity: 'info' })
    }

    warn(message: string) {
        this.messageService.add({ text: message, severity: 'warning' })
    }

    loading(message: string) {
        toast.loading(message)
    }
}
