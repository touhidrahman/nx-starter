const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    xl: '1280px',
                },
                maxWidth: {
                    DEFAULT: 'max-w-xl',
                },
            },
        },
    },
    plugins: [],
}
