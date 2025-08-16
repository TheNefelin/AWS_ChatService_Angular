import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Loading } from '@shared/components/loading/loading';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-navbar',
  imports: [
    Loading
  ],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  private oauthService = inject(OAuthService);
  private platformId = inject(PLATFORM_ID);

  isLoading = true;
  isLoggedIn = false;
  userName = '';
  userEmail = '';
  userPicture = ''; // ← Agregar para la imagen

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.configureGoogleAuth();
    } else {
      // En SSR, ocultar loading inmediatamente
      this.isLoading = false;
    }
  }

  private async configureGoogleAuth() {
    try {
      this.oauthService.configure({
        issuer: 'https://accounts.google.com',
        redirectUri: window.location.origin,
        clientId: environment.GOOGLE_CLIENT_ID,
        scope: 'openid profile email',
        responseType: 'id_token token',
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false
      });

      // Esperar a que se cargue y verificar estado
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.checkAuthStatus();
      
    } catch (error) {
      console.error('Error configurando Google Auth:', error);
    } finally {
      // Ocultar loading cuando termine la configuración
      this.isLoading = false;
    }
  }

  private checkAuthStatus() {
    this.isLoggedIn = this.oauthService.hasValidIdToken();
    if (this.isLoggedIn) {
      const claims = this.oauthService.getIdentityClaims() as any;
      this.userName = claims?.name || '';
      this.userEmail = claims?.email || '';
      this.userPicture = claims?.picture || ''; // ← Obtener la imagen
      console.log('Usuario logueado:', this.userName, this.userEmail, this.userPicture);
    }
  }

  async login() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Mostrar loading durante el proceso de login
    this.isLoading = true;
    
    try {
      console.log('Iniciando login...');
      this.oauthService.initLoginFlow();
      // El loading se ocultará cuando regrese de Google y se ejecute checkAuthStatus
    } catch (error) {
      console.error('Error en login:', error);
      this.isLoading = false;
    }
  }

  logout() {
    this.oauthService.logOut();
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';
    this.userPicture = ''; // ← Limpiar imagen
    this.isLoading = false;
    console.log('Usuario desconectado');
  }
}