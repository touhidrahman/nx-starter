export interface FeedbackDto {
    feedbackType: string
    feedbackText: string
    userId: string
    activePage: string // it is the value from where the feedback was created by the user
}
