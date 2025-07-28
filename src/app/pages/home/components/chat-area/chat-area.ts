import { Component, Input } from '@angular/core';
import { MessageList } from './message-list/message-list';
import { ChatInput } from './chat-input/chat-input';

@Component({
  selector: 'app-chat-area',
  imports: [
    MessageList,
    ChatInput
  ],
  templateUrl: './chat-area.html',
})
export class ChatArea {
  @Input() roomId!: string | null;
}