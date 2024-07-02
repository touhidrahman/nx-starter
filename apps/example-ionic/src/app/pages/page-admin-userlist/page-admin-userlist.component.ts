import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

interface User {
    name: string
    mail: string
    avatarUrl: string
}

@Component({
    selector: 'myorg-page-admin-userlist',
    standalone: true,
    imports: [CommonModule, IonicModule],
    templateUrl: './page-admin-userlist.component.html',
    styleUrl: './page-admin-userlist.component.scss',
})
export class PageAdminUserlistComponent implements OnInit {
    users: User[] = []

    ngOnInit() {
        this.users = [
            {
                name: 'Huey',
                mail: 'huey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Dewey',
                mail: 'dewey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Louie',
                mail: 'louie123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Huey',
                mail: 'huey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Dewey',
                mail: 'dewey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Louie',
                mail: 'louie123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Huey',
                mail: 'huey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Dewey',
                mail: 'dewey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Louie',
                mail: 'louie123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Huey',
                mail: 'huey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Dewey',
                mail: 'dewey123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
            {
                name: 'Louie',
                mail: 'louie123.abc',
                avatarUrl:
                    'https://ionicframework.com/docs/img/demos/avatar.svg',
            },
        ]
    }

    isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
