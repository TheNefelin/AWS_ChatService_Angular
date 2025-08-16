import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/api-response';
import { environment } from 'environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  private _apiUrl = environment.API_BASE_URL;
  private errorApiResponse<T>(message = 'Fallo de red o servidor no disponible'): ApiResponse<T> {
    return {
      isSuccess: false,
      statusCode: 0,
      message,
      data: null as any
    };
  }

  constructor(private http: HttpClient) {}

  protected get<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this._apiUrl).pipe(
      catchError(err => {
        console.error('Error al obtener usuarios:', err);
        return of(this.errorApiResponse<T>());
      })
    );
  }

  protected post<T, B>(endpoint: string, body: B): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, body).pipe(
      catchError(err => {
        console.error('Error al obtener usuarios:', err);
        return of(this.errorApiResponse<T>());
      })
    );
  }

}
