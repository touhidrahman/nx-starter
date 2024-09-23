import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

export interface UserDetail {
    label: string
    iconSrc: string
    placeholder: string
    value: string
}

@Component({
    selector: 'myorg-page-profile',
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule, RouterModule],
    templateUrl: './page-profile.component.html',
    styleUrl: './page-profile.component.scss',
})
export class PageProfileComponent {
    async canDismiss(data?: any, role?: string) {
        return role !== 'gesture'
    }

    userDetails: UserDetail[] = [
        {
            label: 'Name',
            iconSrc: 'assets/avatar/name.png',
            placeholder: 'Enter name',
            value: 'John Doe',
        },
        {
            label: 'Contact',
            iconSrc: 'assets/avatar/phone.png',
            placeholder: 'Enter contact',
            value: '+88017 00 00000',
        },
        {
            label: 'Email',
            iconSrc: 'assets/avatar/email.png',
            placeholder: 'Enter email',
            value: 'john.doe@gmail.com',
        },
        {
            label: 'Division',
            iconSrc: 'assets/avatar/division.png',
            placeholder: 'Enter division',
            value: 'Dhaka',
        },
        {
            label: 'District',
            iconSrc: 'assets/avatar/district.png',
            placeholder: 'Enter district',
            value: 'Kishoreganj',
        },
        {
            label: 'Address',
            iconSrc: 'assets/avatar/address.png',
            placeholder: 'Enter address',
            value: 'College road, Harua',
        },
        {
            label: 'Post',
            iconSrc: 'assets/avatar/post.png',
            placeholder: 'Enter post',
            value: '2300',
        },
    ]
}
