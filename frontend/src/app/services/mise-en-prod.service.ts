import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiseEnProd } from '../demo/models/MiseEnProd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiseEnProdService {
    private apiUrl = 'http://localhost:8089/tests/production';

  constructor(private http: HttpClient) {}

getAll(params?: any): Observable<MiseEnProd[]> {
  let httpParams = new HttpParams();
  if (params) {
    if (params.date) {
      httpParams = httpParams.set('date', params.date);
    }
    if (params.metier) {
      httpParams = httpParams.set('metier', params.metier);
    }
  }
  return this.http.get<MiseEnProd[]>(this.apiUrl, { params: httpParams });
}


  create(miseEnProd: MiseEnProd): Observable<MiseEnProd> {
    return this.http.post<MiseEnProd>(this.apiUrl, miseEnProd);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  update(miseEnProd: MiseEnProd): Observable<MiseEnProd> {
  return this.http.put<MiseEnProd>(`${this.apiUrl}/${miseEnProd.idProd}`, miseEnProd);
}

}