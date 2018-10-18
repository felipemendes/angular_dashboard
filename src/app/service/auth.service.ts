import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorage } from '../core/token.storage';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {
      email: email,
      password: password
    };

    return this.http.post<any>(environment.baseUrl + '/login', credentials)
      .pipe(
        map(user => {
          if (user && user.token) {
            this.token.saveToken(user.token);
          }
          return user;
        }
      )
    );
  }
}