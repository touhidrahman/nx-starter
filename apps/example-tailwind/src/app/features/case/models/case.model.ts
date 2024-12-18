export interface Case {
    id?: string
    number: string
    name: string
    defendant: string
    plaintiffName: string
    plaintiffGroupId: string
    groupId: string
    court: string
    createdAt?: Date
    updatedAt?: Date
}
