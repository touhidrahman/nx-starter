export interface Appointment extends AppointmentDto {
    id: string
    createdAt: string
    updatedAt: string
}

export interface AppointmentDto {
    date: string
    vendorUserId: string
    clientUserId: string
    startTimestamp: string
    endTimestamp: string
    description: string
    notesForVendor: string
    notesForClient: string
    groupId: string
}
