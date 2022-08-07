import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportfoundService {
  headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

  constructor(private _httpClient: HttpClient) { }

  getLoss(id: any): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/loss/${id}`, { headers: this.headers })
  }
  getFound(id: any): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/found/${id}`, { headers: this.headers })
  }
  foundUsers(id: any, data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/loss/found/item/${id}`, data, { headers: this.headers })
  }
  foundMine(id: any, data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/my/item/${id}`, data, { headers: this.headers })
  }
}
