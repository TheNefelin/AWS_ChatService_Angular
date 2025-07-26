import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiResponse } from '@core/models/api-response';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user-service';

@Component({
  selector: 'app-users-list',
  imports: [JsonPipe],
  templateUrl: './users-list.html',
})
export class UsersList {
  apiResponseUser: ApiResponse<User[]> | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.userService.getUsers().subscribe(data => this.apiResponseUser = data);
  }
}
