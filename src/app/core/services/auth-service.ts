import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiBaseService } from './api-base-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { GoogleUserInfo } from '@core/models/google';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBaseService {
  private oauthService = inject(OAuthService);
  private platformId = inject(PLATFORM_ID);

  // Estados reactivos básicos
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private googleUserSubject = new BehaviorSubject<GoogleUserInfo | null>(null);

  // Observables públicos
  isLoading$ = this.isLoadingSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  googleUser$ = this.googleUserSubject.asObservable();

  // PASO 1: Inicializar y configurar Google OAuth
  async initialize(): Promise<void> {
    console.log('🚀 Iniciando AuthService...');
    
    if (isPlatformBrowser(this.platformId)) {
      await this.configureGoogleAuth();
    } else {
      console.log('⚠️ Ejecutándose en servidor (SSR), saltando configuración OAuth');
      this.isLoadingSubject.next(false);
    }
  }
  
  // PASO 2: Configurar Google OAuth
  private async configureGoogleAuth(): Promise<void> {
    try {
      console.log('⚙️ Configurando Google OAuth...');
      
      // Configurar OAuth service
      this.oauthService.configure({
        issuer: 'https://accounts.google.com',
        redirectUri: window.location.origin,
        clientId: environment.GOOGLE_CLIENT_ID,
        scope: 'openid profile email',
        responseType: 'id_token token',
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false
      });

      console.log('✅ Configuración OAuth aplicada');
      console.log('🔗 Redirect URI:', window.location.origin);
      console.log('🆔 Client ID:', environment.GOOGLE_CLIENT_ID);

      // Cargar documento de descubrimiento y intentar login automático
      console.log('📡 Cargando documento de descubrimiento...');
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      
      // Verificar si ya estamos autenticados
      this.checkGoogleAuthStatus();
      
    } catch (error) {
      console.error('❌ Error configurando Google Auth:', error);
    } finally {
      console.log('✅ Configuración completada');
      this.isLoadingSubject.next(false);
    }
  }

  private checkGoogleAuthStatus(): void {
    console.log('🔍 Verificando estado de autenticación...');
    
    const hasValidToken = this.oauthService.hasValidIdToken();
    console.log('🎫 ¿Tiene token válido?', hasValidToken);
    
    if (hasValidToken) {
      // Obtener información del usuario de Google
      const claims = this.oauthService.getIdentityClaims() as any;
      const googleUser: GoogleUserInfo = {
        name: claims?.name || '',
        email: claims?.email || '',
        picture: claims?.picture || '',
        sub: claims?.sub || ''
      };

      // Obtener tokens
      const idToken = this.oauthService.getIdToken();
      const accessToken = this.oauthService.getAccessToken();

      // MOSTRAR TODO EN CONSOLA
      console.log('🎉 USUARIO AUTENTICADO CON GOOGLE:');
      console.log('👤 Datos del usuario:', googleUser);
      console.log('🎫 ID Token (Google):', idToken);
      console.log('🔑 Access Token (Google):', accessToken);
      console.log('⏰ Token expira en:', new Date(this.oauthService.getIdTokenExpiration()));
      
      // Actualizar estados reactivos
      this.isLoggedInSubject.next(true);
      this.googleUserSubject.next(googleUser);
      
    } else {
      console.log('❌ No hay token válido de Google');
      this.clearGoogleAuthState();
    }
  }

  // PASO 4: Iniciar proceso de login
  async login(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('⚠️ Login no disponible en servidor');
      return;
    }
    
    console.log('🔑 Iniciando proceso de login con Google...');
    this.isLoadingSubject.next(true);
    
    try {
      // Esto abrirá popup o redirect a Google
      this.oauthService.initLoginFlow();
      console.log('🌐 Redirigiendo a Google para autenticación...');
      
    } catch (error) {
      console.error('❌ Error iniciando login:', error);
      this.isLoadingSubject.next(false);
      throw error;
    }
  }

  // PASO 5: Logout
  logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    // Logout de Google
    this.oauthService.logOut();
    
    // Limpiar estado local
    this.clearGoogleAuthState();
    
    console.log('✅ Sesión cerrada exitosamente');
  }

  private clearGoogleAuthState(): void {
    this.isLoggedInSubject.next(false);
    this.googleUserSubject.next(null);
  }

  // Métodos de utilidad para obtener datos actuales
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentGoogleUser(): GoogleUserInfo | null {
    return this.googleUserSubject.value;
  }

  getCurrentTokens(): { idToken: string | null; accessToken: string | null } {
    return {
      idToken: this.oauthService.getIdToken(),
      accessToken: this.oauthService.getAccessToken()
    };
  }  
}
