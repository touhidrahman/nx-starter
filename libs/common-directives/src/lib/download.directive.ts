import { HttpClient } from '@angular/common/http'
import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
} from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { Subscription, catchError, map, of } from 'rxjs'

import { InjectionToken } from '@angular/core'

export const SAMEORIGIN = new InjectionToken<RegExp>('wizdm.sameorigin.regex', {
    factory: () => {
        // Test the given URL to start with "data:" or "blob:" or the current host
        return new RegExp(
            `^data:|^blob:|^http(?:s)?:\/\/${window.location.host}`,
        )
    },
})

@Directive({
    selector: 'a[download]',
    exportAs: 'appDownload',
    standalone: true,
})
export class DownloadDirective implements OnDestroy {
    public error = false
    public loading = false

    private sub: Subscription | undefined
    private blob: string | undefined
    private href: string = ''

    constructor(
        @Inject(SAMEORIGIN) private sameOrigin: RegExp,
        private http: HttpClient,
        private ref: ElementRef<HTMLAnchorElement>,
        private sanitizer: DomSanitizer,
    ) {}

    // Turns the 'download' attribute into an input
    @HostBinding('attr.download')
    @Input()
    download: string = ''

    // Intercepts the href
    @Input('href') set source(href: string) {
        // Revokes the previous URL object, if any
        if (this.blob) {
            URL.revokeObjectURL(this.blob)
            this.blob = undefined
        }

        // Resets possible errors
        this.error = false

        // Updates the href
        this.href = href
    }

    // Sanitizes the href to accept both urls and blobs
    @HostBinding('href') get safeHref(): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(this.href)
    }

    @HostListener('click') onClick() {
        if (!this.href || this.loading) {
            return false
        }

        // Proceed with the download on files from the same origin
        if (this.error || this.sameOrigin.test(this.href)) {
            return true
        }

        // Unsubscribes previous subscription, if any
        if (this.sub) {
            this.sub.unsubscribe()
        }

        // Starts processing
        this.loading = true

        // Gets the source file as a blob
        this.sub = this.http
            .get(this.href, { responseType: 'blob' })
            .pipe(
                // Creates the URL object ready for download
                map((blob) => {
                    this.blob = URL.createObjectURL(blob)
                    return this.blob
                }),

                // Catches possible errors such as CORS not allowing the file download
                catchError((error) => {
                    // Reports the error preventing the download
                    console.error('Unable to download the source file', error)

                    // Tracks the error for the next round to complete anyhow
                    this.error = true

                    // Reverts to the original href for the browser to open the file instead of downloading it
                    return of(this.href)
                }),
            )
            .subscribe((url) => {
                // Updates the href with the blob url on success
                this.href = url

                // Ends processing
                this.loading = false

                // Triggers another click event making sure the [href] gets updated first
                setTimeout(() => this.ref.nativeElement.click())
            })

        // Prevents default
        return false
    }

    ngOnDestroy() {
        // Revokes the URL object
        if (this.blob) {
            URL.revokeObjectURL(this.blob)
        }

        // Unsubscribes the encoder
        if (this.sub) {
            this.sub.unsubscribe()
        }
    }
}
