import { Component, signal } from '@angular/core';
import { ApiResponse } from '@core/models/api-response';
import { Room } from '@core/models/room';
import { RoomService } from '@core/services/room-service';
import { Error } from '@shared/components/error/error';
import { Loading } from '@shared/components/loading/loading';

@Component({
  selector: 'app-rooms-list',
  imports: [
    Loading,
    Error
  ],
  templateUrl: './rooms-list.html',
})
export class RoomsList {
  readonly apiResponseRoom = signal<ApiResponse<Room[]> | null>(null);  
  readonly isLoading = signal(false);  

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);

    this.roomService.getRooms().subscribe({
      next: (data) => this.apiResponseRoom.set(data),
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => this.isLoading.set(false),
    });
  } 
}
