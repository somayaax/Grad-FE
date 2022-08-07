import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchImgService {
  headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

  constructor(private _httpClient: HttpClient) { }

  searchInLosses(id: any, data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/found/compare/${id}`, data, { headers: this.headers })
  }


}
