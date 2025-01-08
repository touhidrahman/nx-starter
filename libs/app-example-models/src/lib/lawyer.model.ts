export interface LawyerDto {
    name: string
    instituteName: string
    practiceStartYear: number
    lawyerType: string
    phoneNumber: string
    email: string
    profileImageUrl: string
    coverImageUrl: string
    description: string
    rating: number
    address: string
    city: string
    district: string
    postCode: string
    website: string
    businessHours: string
    sponsored: boolean
    sponsoredUntil: Date
    interestedArea: string
    institutionId: string
    latitude: number
    longitude: number
}

export interface Lawyer extends LawyerDto {
    id: string
    createdAt: Date
    updatedAt: Date
}
