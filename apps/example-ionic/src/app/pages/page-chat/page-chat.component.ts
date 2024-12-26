import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'myorg-page-chat',
    imports: [CommonModule, IonicModule, FormsModule],
    templateUrl: './page-chat.component.html',
    styleUrl: './page-chat.component.scss',
})
export class PageChatComponent {
    messages = [
        { text: 'Hi there!', sender: 'incoming', time: '10:00 AM' },
        { text: 'Hello! How are you?', sender: 'outgoing', time: '10:02 AM' },
    ]

    newMessage = ''

    sendMessage() {
        if (this.newMessage.trim()) {
            this.messages.push({
                text: this.newMessage,
                sender: 'outgoing',
                time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            })
            this.newMessage = ''
        }
    }
}
