import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

  constructor(private _httpClient: HttpClient) { }
  viewReportedLosses(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/loss/reported`, { headers: this.headers })
  }
  viewReportedFounds(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/found/reported`, { headers: this.headers })
  }
  blockLoss(id: any, data: any): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/loss/block/${id}`, data, { headers: this.headers })
  }
  blockFound(id: any, data: any): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/found/block/${id}`, data, { headers: this.headers })
  }


}
