import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Probleme } from '../demo/models/Probleme';
import { map, Observable } from 'rxjs';
import { AuthService } from '../demo/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  private apiUrl = 'http://localhost:8089/tests/problemes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProbleme(probleme: any): Observable<any> {
    const formattedData = {
      ...probleme,
      hCoup: this.extractTimeFromDateTime(probleme.hCoup),
      hReprise: this.extractTimeFromDateTime(probleme.hReprise)
    };
    return this.http.post<any>(this.apiUrl, formattedData);
  }


getAllProblemes(params?: any): Observable<Probleme[]> {
  let httpParams = new HttpParams();
  if (params && params.date) {
    httpParams = httpParams.set('date', params.date);
  }
  return this.http.get<Probleme[]>(this.apiUrl, { params: httpParams }).pipe(
    map(problemes =>
      problemes.map(p => ({
        ...p,
        idProbleme: p.idProbleme,  
        hCoup: this.formatTimeForDisplay(p.hCoup!),
        hReprise: this.formatTimeForDisplay(p.hReprise!)
      }))
    )
  );
}

  private formatTimeForDisplay(time: string): string {
    if (!time) return '';

    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  }

  getProblemeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => ({
        ...p,
        hCoup: this.convertToDateTimeInputFormat(p.hCoup),
        hReprise: this.convertToDateTimeInputFormat(p.hReprise)
      }))
    );
  }

  private convertToDateTimeInputFormat(time: string): string {
    if (!time) return '';
    
    const today = new Date();
    const [hours, minutes] = time.split(':');
    
    today.setHours(parseInt(hours, 10));
    today.setMinutes(parseInt(minutes, 10));
    
    return today.toISOString().slice(0, 16); 
  }

  updateProbleme(id: number, probleme: Probleme): Observable<Probleme> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<Probleme>(`${this.apiUrl}/${id}`, probleme, { headers });
  }

  private extractTimeFromDateTime(dateTime: string): string {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  deleteProbleme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

getProblemesByMotif(motif: string): Observable<Probleme[]> {
    let params = motif ? new HttpParams().set('motif', motif) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params }).pipe(
      map(problemes =>
        problemes.map(p => ({
          ...p,
          id: p.idProbleme, 
          hCoup: this.formatTimeForDisplay(p.hCoup!),
          hReprise: this.formatTimeForDisplay(p.hReprise!)
        }))
      )
    );
  }
}