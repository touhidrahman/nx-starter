export type LawyerLevel = 'senior' | 'junior';

export interface LawyerDto {
    name: string;
    instituteName: string;
    expertLevel: LawyerLevel;
    lawyerType: string;
    experience: string;
    email: string;
    profileImage: string | null;
    description: string | null;
    verified: boolean;
}

export interface Lawyer extends LawyerDto {
    id: string;
    verifiedOn: Date | null;
    createdAt: Date;
    updatedAt: Date;
}