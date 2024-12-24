/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    printWidth: 80,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    plugins: ['prettier-plugin-tailwindcss'],
}

module.exports = config
