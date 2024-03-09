import { FeedbackType } from './feedback-type.enum'

export type FeedbackOptionRadioItem = {
    feedbackType: string
    value: FeedbackType
}

export const FEEDBACK_OPTIONS: FeedbackOptionRadioItem[] = [
    { feedbackType: 'Feedback', value: FeedbackType.Bug },
    { feedbackType: 'Feature Request', value: FeedbackType.Feature },
    { feedbackType: 'Testimonial', value: FeedbackType.Testimonial },
]
