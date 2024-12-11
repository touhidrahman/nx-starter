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
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                lightGreen: '#eaffea',
                green: '#0A5C36',
                grayShade: '#292929',
                lightGray: '#eeecdf',
                gray59: '#595959',
                green2: '#002413',
                green3: '#005900',
                lightAsh: '#c8c8c8',
                gray3e: '#3e3d3d',
                gray9a: '#9a9a9a',
                gray63: '#636363',
                graye2: '#e2e2e2',
                grayD: '#dddddd',
                graye9: '#e9e9e9',
                green020: '#002020',
                gray39: '#393939',
                gray3a: '#3a3a3a',
                graybc: '#bcbcbc',
                grayc5: '#c5c5c5',
                gray43: '#434343',
                black2d: '#2d2121',
                graye0: '#e0e0e0',
                green15b: '#15b400',
                gray47: '#474747',
                blue6d: '#0086DA',
                grayaf: '#afafaf',
                grayf1: '#f1f1f1',
                gray46: '#464646',
                red9c: '#9c0b0b',
                grayc6: '#c6c6c6',
                greenc4: '#c4ff72',
                grayf8: '#f8f8f8',
                graye: '#eeeeee',
                blue0a: '#00A5BB',
                black2e: '#302E2E',
                blue8b: '#0078BB',
                blue0b: '#00BBA5',
                gray70: '#707070',
                blue4b: '#4B8AFF',
                gary64: '#646464',
                gray58: '#585858',
                gray23: '#232323',
                gray99: '#999999',
                gray66: '#666666',
                graybf: '#bfbfbf',
            },
        },
    },
    plugins: [require('tailwindcss-primeui')],
}
