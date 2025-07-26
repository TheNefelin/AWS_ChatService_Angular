import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Room } from '../models/room';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _apiUrl = `${environment.apiBaseUrl}/ChatRooms`;

  constructor(private http:HttpClient) {}
  
  getRooms(): Observable<ApiResponse<Room[]>> {
    return this.http.get<ApiResponse<Room[]>>(this._apiUrl);
  }  
}
