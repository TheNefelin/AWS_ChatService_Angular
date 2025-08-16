import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = `${environment.API_BASE_URL}/Users`;
  private errorApiResponse<T>(message = 'Fallo de red o servidor no disponible'): ApiResponse<T> {
    return {
      isSuccess: false,
      statusCode: 0,
      message,
      data: null as any
    };
  }

  constructor(private http:HttpClient) {}
  
  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this._apiUrl).pipe(
      catchError(err => {
        console.error('Error al obtener usuarios:', err);
        return of(this.errorApiResponse<User[]>());
      })
    );
  }
}