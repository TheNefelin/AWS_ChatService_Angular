import { Component, EventEmitter, NgModule, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '@core/models/api-response';
import { Room, RoomCreate } from '@core/models/room';
import { RoomService } from '@core/services/room-service';
import { Error } from '@shared/components/error/error';
import { Loading } from '@shared/components/loading/loading';

@Component({
  selector: 'app-rooms-list',
  imports: [
    Loading,
    Error,
    FormsModule,
  ],
  templateUrl: './rooms-list.html',
})
export class RoomsList {
  @Output() roomSelected = new EventEmitter<string>();
  readonly apiResponseRoom = signal<ApiResponse<Room[]> | null>(null);  
  readonly isLoading = signal(false);
  newRoomName = ''

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.loadRooms();
  }
  
  private loadRooms() {
    this.isLoading.set(true);

    this.roomService.getRooms().subscribe({
      next: (data) => this.apiResponseRoom.set(data),
      error: (err) => {
        console.error('Error:', err);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  createRoom() {
    if (!this.newRoomName.trim()) {
      return;
    }

    const newRoom: RoomCreate = {
      name: this.newRoomName.trim()
    };

    this.isLoading.set(true);    

    this.roomService.createRoom(newRoom).subscribe({
      next: (response) => {
        console.log('Sala creada:', response.data);
        this.loadRooms();
        this.newRoomName = '';
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading.set(false);        
      },
      complete: () => this.isLoading.set(false),
    });
  }

  onRoomClick(roomId: string) {
    this.roomSelected.emit(roomId);
  }  
}