import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'https://localhost:7081/api/ChatRooms';

  constructor(private http:HttpClient) {}
  
  getUsers(): Observable<ApiResponse<Room[]>> {
    return this.http.get<ApiResponse<Room[]>>(this.apiUrl);
  }  
}
