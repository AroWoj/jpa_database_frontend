import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Token } from '../services/token';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.API_BASE_URL || 'http://localhost:8080/api/v1';
  baseUrl = `${this.BASE_URL}/auth`
  private token = '';
  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    console.log("Auth ", this.token)
    return this.token == null ? false : true;
  }

  set isLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  register(authData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, authData)
  }

  login(authData: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/authenticate`, authData)
  }

  confirm(token: string) {
    return this.http.get(`${this.baseUrl}/activate-account`, { params: { token: token } })
  }

  doLogin() {
    this.router.navigate(['/login'])
  }
  logout() {
    let removeToken = localStorage.removeItem('token');
    this.token = '';
    this.loggedIn = false;
    if (removeToken == null) {
      this.router.navigate(['/login'])
    }

  }
}
