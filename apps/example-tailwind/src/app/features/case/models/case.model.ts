export interface Case {
    id: string
    name: string
    court: string
    plaintiffName: string
    plaintiffGroupId: string
    defendant: string
    groupId: string
    number: string
    createdAt: Date
    updatedAt: Date
}

export interface CaseInput {
    name: string
    court: string
    plaintiffName: string
    plaintiffGroupId: string
    defendant: string
    groupId: string
    number: string
}
