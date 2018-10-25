import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + '/user';

  getUsers(status: number = 1) {
    return this.http.get<User>(this.baseUrl + '/?status=' + status);
  }

  getUserByUuid(uuid: string, status: number = 1) {
    return this.http.get<User>(this.baseUrl + '/?uuid=' + uuid + '&status=' + status);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/signup', user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.uuid, user);
  }

  deleteUser(uuid: string) {
    return this.http.delete(this.baseUrl + '/' + uuid);
  }
}
