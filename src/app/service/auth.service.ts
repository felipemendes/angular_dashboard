import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorage } from '../core/token.storage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {
      email: email,
      password: password
    };

    return this.http.post<any>('http://localhost:3000/login', credentials)
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