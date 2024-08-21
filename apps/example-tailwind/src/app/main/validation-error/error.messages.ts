export const ERROR_MESSAGES: { [key: string]: (param?: any) => string } = {
    required: () => 'This field is required.',
    minlength: (param: any) =>
        `Minimum length is ${param.requiredLength} characters.`,
    maxlength: (param: any) =>
        `Maximum length is ${param.requiredLength} characters.`,
    min: (param: any) => `Minimum value is ${param.min}.`,
    max: (param: any) => `Maximum value is ${param.max}.`,
    email: () => `Invalid email.`,
    pattern: (param: any) => param.requiredPatternMessage || `Invalid format.`,
}
