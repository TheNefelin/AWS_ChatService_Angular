import { Component, signal } from '@angular/core';
import { Navigation } from './components/navigation/navigation';
import { ChatArea } from './components/chat-area/chat-area';

@Component({
  selector: 'app-home',
  imports: [
    Navigation,
    ChatArea
  ],
  templateUrl: './home.html',
})
export class Home {
  selectedRoomId = signal<string | null>(null);
}