export interface ReleaseNoteDto {
    id: string
    releaseDate?: Date | string
    version: string
    title: string
    content: string
}
export interface ReleaseNote extends ReleaseNoteDto {
    createdAt?: Date
    updatedAt?: Date
}
