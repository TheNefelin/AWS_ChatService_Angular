import { Component, signal } from '@angular/core';
import { ApiResponse } from '@core/models/api-response';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user-service';
import { Error } from '@shared/components/error/error';
import { Loading } from '@shared/components/loading/loading';

@Component({
  selector: 'app-users-list',
  imports: [
    Loading,
    Error
  ],
  templateUrl: './users-list.html',
})
export class UsersList {
  readonly apiResponseUser = signal<ApiResponse<User[]> | null>(null);
  readonly isLoading = signal(false);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);

    this.userService.getUsers().subscribe({
      next: (data) => this.apiResponseUser.set(data),
      error: (err) => {
        console.error('Error:', err);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}