import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { forkJoin, Observable, Subscription, tap } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { GabService } from 'src/app/services/gab.service';
import { MiseEnProd } from '../../models/MiseEnProd';
import { MiseEnProdService } from 'src/app/services/mise-en-prod.service';
import { Probleme } from '../../models/Probleme';
import { ProblemeService } from 'src/app/services/probleme.service';
import { NbrGabService } from 'src/app/services/nbr-gab.service';
import { NbrGAB } from '../../models/NbrGAB';
import { AuthService } from '../../services/auth.service';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
      selector: 'app-dashboard',
      templateUrl: './dashboard.component.html',
      styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  today: string;
  incidentsDuJour: any[] = [];
  incidentsNonResolus: any[] = [];
  incidentsResolus: any[] = [];
  autresIncidents: any[] = [];
  events: any[] = [];
  gabs: any[] = [];
  problemeList: any[] = [];
  miseEnProductionList: MiseEnProd[] = [];
  loading = true;
    nbrGabsList: NbrGAB[] = [];

  errorMessage: string | null = null;
  totalGabs: number = 0;
  gabsHorsService: number = 0;
  tauxDisponibilite: number = 0;
  tauxDisponibiliteMois: number = 0;
  currentUser: any = null;
  selectedDate: string;
  private apiUrl ='http://localhost:8089/tests/incidents';
  private apiUrl1 ='http://localhost:8089/tests/events';
  private apiUrl2 ='http://localhost:8089/tests/gabs';
  private apiUrl3 ='http://localhost:8089/tests/production';
  private apiUrl4 ='http://localhost:8089/tests/problemes';
  private apiUrl5 ='http://localhost:8089/tests/nbrgabs';
  
  constructor(
    private http: HttpClient ,  
    private eventService: EventService , 
    private gabService: GabService ,
    private miseEnProdService: MiseEnProdService ,
    private problemeService: ProblemeService ,
    private nbrGabService: NbrGabService ,
    private authService: AuthService,
    private incidentService: IncidentService,
    
    ) {
    const now = new Date();
    this.today = now.toLocaleDateString('fr-FR');
    this.selectedDate = this.today; 
  }
 loadIncidentsAlternative() {
    this.loading = true;
    const params = { date: this.selectedDate };
    
    forkJoin({
      duJour: this.incidentService.getIncidentsDuJour(params),
      nonResolus: this.incidentService.getIncidentsNonResolus(params),
      resolus: this.incidentService.getIncidentsResolus(params),
      autres: this.incidentService.getAutresIncidents(params)
    }).subscribe({
      next: (results) => {
        this.incidentsDuJour = results.duJour;
        this.incidentsNonResolus = results.nonResolus;
        this.incidentsResolus = results.resolus;
        this.autresIncidents = results.autres;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des incidents:', error);
        this.errorMessage = 'Impossible de charger les incidents.';
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDataForSelectedDate();
    this.loadIncidents();
    this.loadEvents(); 
    this.loadGabs(); 
    this.loadMiseEnProd();
    this.loadProblemes();
    this.loadNbrGabs();
 }

  loadDataForSelectedDate(): void {
    this.loadIncidents();
    this.loadEvents(); 
    this.loadGabs(); 
    this.loadMiseEnProd();
    this.loadProblemes();
    this.loadNbrGabs();
  }
  loadNbrGabs() {
    const params = { date: this.selectedDate };
    this.nbrGabService.getAll(params).subscribe({
      next: (data: NbrGAB[]) => {
        this.nbrGabsList = data;
        if (data.length > 0) {
          const stats = data[0];
          this.totalGabs = stats.nbreGAB;
          this.gabsHorsService = stats.nbreGABH;
          this.tauxDisponibilite = stats.tauxDis;
          this.tauxDisponibiliteMois = stats.tauxDisMois;
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stats GAB:', err);
      }
    });
  }

  loadMiseEnProd() {
    const params = { date: this.selectedDate };
    this.miseEnProdService.getAll(params).subscribe({
      next: (data) => {
        this.miseEnProductionList = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des mises en production :', error);
      }
    });
  }

 loadIncidents() {
    this.loading = true;
    this.errorMessage = null;
    
    const params = { date: this.selectedDate };
    
    this.incidentService.getAllIncidents(params).subscribe({
      next: (incidents: any[]) => {
        this.processIncidents(incidents);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des incidents:', error);
        this.errorMessage = 'Impossible de charger les incidents. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }
  loadEvents() {
    const params = { date: this.selectedDate };
    this.eventService.getAllEvents(params).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements :', error);
      }
    });
  }

  onDateChange(): void {
    this.loadDataForSelectedDate();
  }
  loadGabs() {
    const params = { date: this.selectedDate };
    this.gabService.getAllGabs(params).subscribe({
      next: (data) => {
        this.gabs = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des GABs :', error);
      }
    });
  }

    loadProblemes() {
    const params = { date: this.selectedDate };
    this.problemeService.getAllProblemes(params).subscribe({
      next: (data) => {
        this.problemeList = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des problèmes:', error);
      }
    });
  }
loadData() {
    this.loading = true;
    this.errorMessage = null;

    this.http.get<any[]>(this.apiUrl1).subscribe({
      next: (incidents: any[]) => {
        this.processIncidents(incidents);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des incidents:', error);
        this.errorMessage = 'Impossible de charger les incidents.';
        this.loading = false;
      }
    });
  }


private processIncidents(incidents: any[]) {
    this.incidentsDuJour = incidents.filter(incident =>
      incident.typeIncident === 'INCIDENTS_DU_JOUR'
    );

    this.incidentsNonResolus = incidents.filter(incident =>
      incident.typeIncident === 'INCIDENTS_NON_RESOLUS'
    );

    this.incidentsResolus = incidents.filter(incident =>
      incident.typeIncident === 'INCIDENTS_RESOLUS'
    );

    this.autresIncidents = incidents.filter(incident =>
      incident.typeIncident === 'AUTRES_INCIDENTS'
    );
  }
  getIntervenantName(incident: any): string {
    if (incident.user && incident.user.firstName) {
      return incident.user.firstName;
    }
        if (this.currentUser) {
      return this.currentUser.firstName;
    }
    
    return 'Non assigné';
  }

  printPage() {
    window.print();
  }
formatTimeToH(time: string | Date | undefined): string {
  if (!time) return '';

  if (typeof time === 'string' && time.includes('T')) {
    const d = new Date(time);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}h${m}`;
  }

  if (time instanceof Date) {
    const h = time.getHours().toString().padStart(2, '0');
    const m = time.getMinutes().toString().padStart(2, '0');
    return `${h}h${m}`;
  }

  if (typeof time === 'string') {
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  }

  return '';
}

formatDateTimeFr(date: Date | string | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  const jour = d.getDate().toString().padStart(2, '0');
  const mois = (d.getMonth() + 1).toString().padStart(2, '0'); 
  const annee = d.getFullYear();
  const heures = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${jour}/${mois}/${annee} à ${heures}h${minutes}`;
}

formatTimeForDisplay(time: any): string {
  if (!time) return '';
  try {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}h${minutes}`;
  } catch {
    return time;
  }
}


formatTimeDisplay(timeStr: string): string {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  return timeStr || '';
}


  formatDateDisplay(dateStr: string): string {
    if (!dateStr) return '';
    return dateStr; 
  }



}