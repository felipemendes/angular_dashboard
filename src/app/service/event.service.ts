import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event.model';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + '/events';

  getEvents(status: number = 1, limit: number = 10, page: number = 1) {
    return this.http.get<Event[]>(this.baseUrl + '/?status=' + status + '&page=' + page + '&limit=' + limit);
  }

  getEventByUuid(uuid: string, status: number = 1) {
    return this.http.get<Event>(this.baseUrl + '/?uuid=' + uuid + '&status=' + status);
  }

  createEvent(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  updateEvent(formData: FormData) {
    return this.http.put(this.baseUrl + '/' + formData.get('uuid'), formData);
  }

  deleteEvent(uuid: string) {
    return this.http.delete(this.baseUrl + '/' + uuid);
  }
}
