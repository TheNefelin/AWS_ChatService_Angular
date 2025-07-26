import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiResponse } from '@core/models/api-response';
import { Room } from '@core/models/room';
import { RoomService } from '@core/services/room-service';

@Component({
  selector: 'app-rooms-list',
  imports: [JsonPipe],
  templateUrl: './rooms-list.html',
})
export class RoomsList {
  apiResponseRoom: ApiResponse<Room[]> | null = null;

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.roomService.getRooms().subscribe(data => this.apiResponseRoom = data);
  }
}
