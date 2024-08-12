const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                warning: 'hsl(var(--warning))',
                'warning-foreground': 'hsl(var(--warning-foreground))',
                success: 'hsl(var(--success))',
                'success-foreground': 'hsl(var(--success-foreground))',

                irishGreen: {
                    50: '#DFFFDB',
                    100: '#BFFFB8',
                    200: '#7EFF70',
                    300: '#43FF2E',
                    400: '#17E600',
                    500: '#119E00',
                    600: '#0D8000',
                    700: '#0A6100',
                    800: '#063D00',
                    900: '#031F00',
                    950: '#020F00',
                },
            },
        },
    },
    plugins: [],
}
