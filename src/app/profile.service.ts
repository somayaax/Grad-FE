import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  // apiUrl = 'https://lossesproject.herokuapp.com/user'
  headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

  constructor(private _httpClient: HttpClient) { }
  viewProfile(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/user/profile`, { headers: this.headers })
  }
  completeProfile(data:any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/user/profile/complete`,data , { headers:this.headers })    
  }
  viewProfileByID(id:any): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/user/profile/${id}`)
  }
}