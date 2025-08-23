import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { Token } from './token';
import { AuthRequest } from './authrequest';
import { UserDTO } from '../interface/userDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlBase = environment.API_BASE_URL || 'http://localhost:8080/api/v1';

  constructor(public http: HttpClient) { }

  // public login(): Observable<Token> {
  //   const authRequest: AuthRequest = {email:'arekw37@o2.pl', password:'password'}
  //   return this.http.post<Token>(`${this.urlBase}/auth/authenticate`,authRequest)
  // }
  public getUsers(): Observable<Array<UserDTO>> {
    //const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get<Array<UserDTO>>(`${this.urlBase}/users`)
  }
}


