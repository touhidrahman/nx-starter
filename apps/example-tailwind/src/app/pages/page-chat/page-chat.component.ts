import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgFor } from '@angular/common'

interface Message {
    text: string
    type: 'sent' | 'received'
}

interface Chat {
    id: number
    name: string
    messages: Message[]
}

@Component({
    selector: 'app-page-chat',
    standalone: true,
    imports: [FormsModule, NgClass, NgFor],
    templateUrl: './page-chat.component.html',
    styleUrl: './page-chat.component.css',
})
export class PageChatComponent {
    chatList: Chat[] = [
        { id: 1, name: 'Alice', messages: [{ text: 'Hi!', type: 'received' }] },
        {
            id: 2,
            name: 'Bob',
            messages: [{ text: 'Hello!', type: 'received' }],
        },
        { id: 3, name: 'Charlie', messages: [] },
    ]

    selectedChat: Chat | null = null
    newMessage: string = ''

    selectChat(chat: Chat) {
        this.selectedChat = chat
    }

    sendMessage() {
        if (this.newMessage.trim() && this.selectedChat) {
            this.selectedChat.messages.push({
                text: this.newMessage,
                type: 'sent',
            })
            this.newMessage = ''
        }
    }
}
