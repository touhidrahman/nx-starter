import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-sans">
            <div class="flex flex-col h-screen justify-center items-center">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <h1 class="text-5xl font-bold mb-8 text-gray-800">404</h1>
                    <p class="text-xl mb-8 text-gray-800">
                        Oops! The page you are looking for does not exist.
                    </p>
                    <a
                        href="/"
                        class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full font-bold shadow-md"
                        >Go back to dashboard
                    </a>
                </div>
            </div>
        </div>
    `,
    styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
