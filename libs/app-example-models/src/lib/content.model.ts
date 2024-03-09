import { Category } from './category.model'
import { Organization } from './organization.model'
import { User } from './user.model'

export interface ContentDto {
    id?: string
    abstract?: string
    categoryId?: string
    colors: string[]
    coverPhoto?: string
    creatorId: string
    description: string
    managerId?: string
    organizationId: string
    tags: string[]
    titleBn: string
    titleEn: string
}

export interface Content extends ContentDto {
    category: Category
    creator?: User
    index: number
    locked: boolean
    manager?: User
    order: number
    organization?: Partial<Organization>
    tagsStr?: string
    colorsStr?: string

    createdAt: Date
    updatedAt: Date
}
