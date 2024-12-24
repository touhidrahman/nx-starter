import { Component } from '@angular/core'

@Component({
    selector: 'app-page-not-found',
    imports: [],
    template: `
        <div class="flex flex-col items-center justify-center py-8">
            <img class="w-25 h-14" src="assets/logo/sheresta.png" alt="" />
            <img class="mt-20 w-96" src="assets/image/404.png" alt="" />
            <h1
                class="text-center text-3xl font-bold text-gray-500 md:text-7xl">
                Page Not Found!
            </h1>
            <a
                href="/"
                class="mt-6 rounded-md bg-green-500 px-4 py-2 font-bold text-white shadow-md hover:bg-green-700"
                >Go back to Homepage
            </a>
        </div>
    `,
    styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
