import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NbrGAB } from '../demo/models/NbrGAB';

@Injectable({
  providedIn: 'root'
})
export class NbrGabService {

  private apiUrl = 'http://localhost:8089/tests/nbrgabs';

  constructor(private http: HttpClient) { }


getAll(params?: any): Observable<NbrGAB[]> {
  let httpParams = new HttpParams();
  if (params) {
    if (params.date) httpParams = httpParams.set('date', params.date);
    if (params.tauxDisMois) httpParams = httpParams.set('tauxDisMois', params.tauxDisMois);
  }
  return this.http.get<NbrGAB[]>(this.apiUrl, { params: httpParams });
}

  getById(id: number): Observable<NbrGAB> {
    return this.http.get<NbrGAB>(`${this.apiUrl}/${id}`);
  }

  create(nbrGab: NbrGAB): Observable<NbrGAB> {
    return this.http.post<NbrGAB>(this.apiUrl, nbrGab);
  }

  update(id: number, nbrGab: NbrGAB): Observable<NbrGAB> {
    return this.http.put<NbrGAB>(`${this.apiUrl}/${id}`, nbrGab);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}