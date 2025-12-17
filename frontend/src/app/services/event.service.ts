import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../demo/models/IEvent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8089/tests/events';

  constructor(private http: HttpClient) { }

getAllEvents(params?: any): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl, { params });
}

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.apiUrl, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getEventsByType(eventType: string): Observable<IEvent[]> {
  return this.http.get<IEvent[]>(this.apiUrl, { params: { eventType } });
}
updateEvent(id: number, event: IEvent): Observable<IEvent> {
  return this.http.put<IEvent>(`${this.apiUrl}/${id}`, event);
}

}