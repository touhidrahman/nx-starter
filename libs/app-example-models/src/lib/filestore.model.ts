export interface FilestoreItemDto {
    entity?: string
    type: string
    name: string
    path: string
}

export interface FilestoreItem extends FilestoreItemDto {
    id: string
    createdAt: Date
    updatedAt: Date
}
