import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '@core/services/auth-service';
import { Loading } from '@shared/components/loading/loading';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    AsyncPipe,
    Loading
  ],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);

  isLoading$: Observable<boolean> = this.authService.isLoading$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;  

 ngOnInit() {
    this.initAuth();
  }

  private async initAuth() {
    try {
      await this.authService.initialize();
    } catch (error) {
      console.error('Error inicializando auth', error);
    }
  }

  async login() {
    await this.authService.login();
  }

  async logout() {
    await this.authService.logout();
  }
}