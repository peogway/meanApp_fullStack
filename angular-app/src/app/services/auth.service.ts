import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';
import { tokenNotExpired } from 'angular2-jwt';

interface AuthResponse {
  success?: boolean;
  msg?: string;
  user?: any;
  token?: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application-json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;

  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<AuthResponse> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<AuthResponse>(url, user);
  }

  tryLogin(username: string, password: string): Observable<AuthResponse> {
    const url = `${this.apiUrl}/authenticate`;
    return this.http.post<AuthResponse>(url, { username, password });
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(): Observable<AuthResponse> {
    const url = `${this.apiUrl}/profile`;
    this.loadToken();
    if (!this.authToken) {
      return of({ success: false });
    }
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });

    return this.http.get<AuthResponse>(url, { headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
