import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../demo/models/Incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'http://localhost:8089/tests/incidents';
  private userApiUrl = 'http://localhost:8089/tests/user/allUser';

  constructor(private http: HttpClient) { }

  getAllIncidents(params?: any): Observable<any[]> {
    let httpParams = new HttpParams();
    if (params && params.date) {
      httpParams = httpParams.set('date', params.date);
    }
    return this.http.get<any[]>(this.apiUrl, { params: httpParams });
  }

  getIncidentsByType(type: string, params?: any): Observable<any[]> {
    let httpParams = new HttpParams();
    if (params && params.date) {
      httpParams = httpParams.set('date', params.date);
    }
    return this.http.get<any[]>(`${this.apiUrl}/type/${type}`, { params: httpParams });
  }

  getIncidentsDuJour(params?: any): Observable<any[]> {
    return this.getIncidentsByType('INCIDENTS_DU_JOUR', params);
  }

  getIncidentsNonResolus(params?: any): Observable<any[]> {
    return this.getIncidentsByType('INCIDENTS_NON_RESOLUS', params);
  }

  getIncidentsResolus(params?: any): Observable<any[]> {
    return this.getIncidentsByType('INCIDENTS_RESOLUS', params);
  }

  getAutresIncidents(params?: any): Observable<any[]> {
    return this.getIncidentsByType('AUTRES_INCIDENTS', params);
  }

  saveIncident(incidentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, incidentData);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getIncident(id: number): Observable<Incident> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Incident>(url);
  }

  updateIncident(incident: Incident): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${incident.id}`, incident);
  }

  searchIncidents(params: any): Observable<Incident[]> {
    let httpParams = new HttpParams();
    if (params.dateCreation) {
      httpParams = httpParams.set('dateCreation', params.dateCreation);
    }
    if (params.nature) {
      httpParams = httpParams.set('nature', params.nature);
    }
    return this.http.get<Incident[]>(`${this.apiUrl}/search`, { params: httpParams });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl);
  }
}