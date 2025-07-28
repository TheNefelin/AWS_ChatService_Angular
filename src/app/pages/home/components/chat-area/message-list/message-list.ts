import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { ApiResponse } from '@core/models/api-response';
import { Message } from '@core/models/message';
import { MessageService } from '@core/services/message-service';
import { Error } from '@shared/components/error/error';
import { Loading } from '@shared/components/loading/loading';

@Component({
  selector: 'app-message-list',
  imports: [
    Loading,
    Error
  ],
  templateUrl: './message-list.html',
})
export class MessageList {
  @Input() roomId: string | null = null;  
  readonly apiResponseMessage = signal<ApiResponse<Message[]> | null>(null);
  readonly isLoading = signal(false);

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.apiResponseMessage.set(null);

    if (changes['roomId'] && this.roomId) {
      this.loadMessages(this.roomId);
    }
  }

  // ngOnInit() {
  //   this.loadMessages('a1b2c3d4-e5f6-7890-abcd-1234567890ab');
  // }

  private loadMessages(chatRoomId: string) {
    this.isLoading.set(true);

    this.messageService.getMessages(chatRoomId).subscribe({
      next: (data) => this.apiResponseMessage.set(data),
      error: (err) => {
        console.error('Error:', err);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}