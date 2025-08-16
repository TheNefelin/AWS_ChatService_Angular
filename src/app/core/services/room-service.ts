import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/api-response';
import { Room, RoomCreate } from '@core/models/room';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _apiUrl = `${environment.API_BASE_URL}/ChatRooms`;

  constructor(private http:HttpClient) {}
  
  getRooms(): Observable<ApiResponse<Room[]>> {
    return this.http.get<ApiResponse<Room[]>>(this._apiUrl);
  }

  createRoom(room: RoomCreate): Observable<ApiResponse<Room>> {
    return this.http.post<ApiResponse<Room>>(this._apiUrl, room);
  }    
}
