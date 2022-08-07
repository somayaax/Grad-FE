import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiUrl = 'https://lossesproject.herokuapp.com/user'
  currentUser = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem('userToken') != null) {
      this.saveCurrentUser()
    }
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem('userToken')
    this.currentUser.next(jwtDecode(token))
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.currentUser.next(null)
  }
  getCurrentUser(): any {
    let token: any = localStorage.getItem('userToken')
    if (token) {
      let user: any = new BehaviorSubject(jwtDecode(token));
      return user.getValue().id;
    }
  }
  getCurrentRole(): any {
    let token: any = localStorage.getItem('userToken')
    if (token) {
      let user: any = new BehaviorSubject(jwtDecode(token));
      return user.getValue().role;
    }
  }
  signup(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/user/signup`, data)
  }
  signin(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/user/signin`, data)
  }
}
