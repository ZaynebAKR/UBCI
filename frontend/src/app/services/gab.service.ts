import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gab } from '../demo/models/Gab';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GabService {
  private apiUrl = 'http://localhost:8089/tests/gabs';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    return throwError(() => new Error('Une erreur est survenue'));
  }

  createGab(gab: Gab): Observable<Gab> {
    return this.http.post<Gab>(this.apiUrl, gab);
  }

 getAllGabs(params?: any): Observable<any[]> {
    let httpParams = new HttpParams();
    if (params && params.date) {
      httpParams = httpParams.set('date', params.date);
    }
    return this.http.get<any[]>(this.apiUrl, { params: httpParams });
  }

  getGabById(idGab: number): Observable<Gab> {
    return this.http.get<Gab>(`${this.apiUrl}/${idGab}`);
  }

  updateGab(idGab: number, gab: Gab): Observable<Gab> {
    return this.http.put<Gab>(`${this.apiUrl}/${idGab}`, gab);
  }

  deleteGab(idGab: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idGab}`);
  }
}