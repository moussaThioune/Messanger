import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.baseURL + 'authentification';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user: any) {
    return this.http.post(this.authUrl + '/login', user);
    // 'http://localhost:8080/api/v1/authentification/register'
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  register(data: any) {
    return this.http.post(this.authUrl + '/register', data);
  }
}
