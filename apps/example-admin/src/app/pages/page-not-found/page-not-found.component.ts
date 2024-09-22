import { Component } from '@angular/core'

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [],
    template: `
        <div class="flex flex-col items-center py-8 justify-center">
            <img class="h-14 w-25" src="assets/logo/sheresta.png" alt="" />
            <img class="w-96 mt-20 " src="assets/image/404.png" alt="" />
            <h1
                class="md:text-7xl text-3xl text-center font-bold text-gray-500">
                Page Not Found!
            </h1>
            <a
                href="/"
                class="bg-green-500 mt-6 hover:bg-green-700 text-white py-2 px-4 rounded-md font-bold shadow-md"
                >Go back to Homepage
            </a>
        </div>
    `,
    styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
