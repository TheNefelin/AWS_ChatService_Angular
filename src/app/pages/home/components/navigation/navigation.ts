import { Component } from '@angular/core';
import { RoomsList } from './rooms-list/rooms-list';
import { UsersList } from './users-list/users-list';

@Component({
  selector: 'app-navigation',
  imports: [
    RoomsList,
    UsersList
  ],
  templateUrl: './navigation.html',
})
export class Navigation {
  selectedTab: 'rooms' | 'users' = 'users';

  constructor() {}

  ngOnInit() {
    this.onTabChanged('rooms');
  }

  onTabChanged(tab: 'rooms' | 'users') {
    this.selectedTab = tab;
  }
}