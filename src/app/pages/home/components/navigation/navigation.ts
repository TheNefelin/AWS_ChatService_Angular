import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RoomsList } from './rooms-list/rooms-list';
import { UsersList } from './users-list/users-list';
import { User } from '../../../../core/models/user';
import { Room } from '../../../../core/models/room';
import { UserService } from '../../../../core/services/user-service';
import { ApiResponse } from '../../../../core/models/api-response';
import { RoomService } from '../../../../core/services/room-service';

@Component({
  selector: 'app-navigation',
  imports: [
    JsonPipe,
    RoomsList,
    UsersList
  ],
  templateUrl: './navigation.html',
})
export class Navigation {
  selectedTab: 'rooms' | 'users' = 'users';
  apiResponseUser: ApiResponse<User[]> | null = null;
  apiResponseRoom: ApiResponse<Room[]> | null = null;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {}

  onTabChanged(tab: 'rooms' | 'users') {
    this.selectedTab = tab;

    if (tab === 'users' && !this.apiResponseUser) {
      this.userService.getUsers().subscribe(data => this.apiResponseUser = data);
    }

    if (tab === 'rooms' && !this.apiResponseRoom) {
      this.roomService.getUsers().subscribe(data => this.apiResponseRoom = data);
    }
  }
}