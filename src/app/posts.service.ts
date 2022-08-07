import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

  constructor(private _httpClient: HttpClient) { }

  reportFoundPost(id:any, data:any): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/found/report/${id}`,data, { headers: this.headers })
  }
  reportLossPost(id:any, data:any): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/loss/report/${id}`,data, { headers: this.headers })

  }
  addLost(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/loss/post`, data, { headers: this.headers })
  }
  addFound(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/found/post`, data, { headers: this.headers })
  }
  viewYourLosses(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/loss/posts/me`, { headers: this.headers })
  }
  viewYourFounds(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/found/posts/me`, { headers: this.headers })
  }
  viewUserLosses(id:any): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/loss/posts/${id}`, { headers: this.headers })
  }
  viewUserFounds(id:any): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/found/posts/${id}`, { headers: this.headers })
  }
  deleteLost(id: any): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/loss/delete/${id}`, { headers: this.headers })
  }
  deleteFound(id: any): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/found/delete/${id}`, { headers: this.headers })
  }
  getAllLoss(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/loss/posts`, { headers: this.headers })
  }
  getAllFound(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/found/posts`, { headers: this.headers })
  }
}