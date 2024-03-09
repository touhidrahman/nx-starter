import { Injectable } from '@angular/core';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    protected readonly toast = toast;

    success(message: string) {
        this.toast.success(message);
    }

    error(message: string) {
        this.toast.error(message)
    }

    info(message: string) {
        this.toast.info(message)
    }

    warn(   message: string) {
        this.toast.warning(message)
    }

    loading(message: string) {
        this.toast.loading(message)
    }
}