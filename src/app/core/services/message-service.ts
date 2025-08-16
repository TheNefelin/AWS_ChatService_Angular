import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ApiResponse } from '@core/models/api-response';
import { Message } from '@core/models/message';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly _apiUrl = `${environment.API_BASE_URL}/Messages`;
  readonly isLoading = signal(false);

  constructor(private http:HttpClient) {}

  getMessages(chatRoomId: string): Observable<ApiResponse<Message[]>> {
    // const params = new HttpParams().set('chatRoomId', chatRoomId);
    // return this.http.get<ApiResponse<Message[]>>(this._apiUrl, { params });
    return this.http.get<ApiResponse<Message[]>>(`${this._apiUrl}/${chatRoomId}`);
  }

  createMessage(message: Message): Observable<ApiResponse<Message>> {
    return this.http.post<ApiResponse<Message>>(this._apiUrl, message);
  }
}