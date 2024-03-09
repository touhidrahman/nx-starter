import { FeedbackDto } from './feedback-dto.model'
import { FilestoreItem } from './filestore.model'
import { User } from './user.model'

export interface Feedback extends FeedbackDto {
    id: string
    attachments: FilestoreItem[]
    user?: User
    isRead: boolean
    isReplied: boolean

    createdAt: Date
    updatedAt: Date
}
