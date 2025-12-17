import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Incident } from 'src/app/demo/models/Incident';
import { IncidentService } from 'src/app/services/incident.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];
  expandedIncidentId: number | null = null;
  incidentTypes: string[] = ['INCIDENTS_DU_JOUR', 'INCIDENTS_NON_RESOLUS', 'INCIDENTS_RESOLUS', 'AUTRES_INCIDENTS'];
  searchForm!: FormGroup;
  selectedIncident: Incident | null = null;
  showUpdateModal: boolean = false;
  updateForm!: FormGroup;
  incidentNaturesEnum: string[] = ['TECHNIQUE', 'OPERATIONNEL', 'SECURITE'];
  users: any[] = [];  



  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private fb: FormBuilder,

      ) {}

ngOnInit(): void {
  this.searchForm = this.fb.group({
    dateCreation: [''],
    nature: ['']
  });
  this.loadIncidents(); 
  this.loadUsers();
  this.incidentService.getAllUsers().subscribe({
    next: data => {
      console.log('Users data:', data); 
      console.log('First user structure:', data[0]); // Voir la structure exacte
      this.users = data;
    },
    error: err => {
      console.error('Erreur lors du chargement des utilisateurs', err);
      console.error('URL appelée:', err.url); // Voir l'URL appelée
    }
  });
}

loadUsers(): void {
  this.incidentService.getAllUsers().subscribe({
    next: data => {
      console.log('Users data:', data); 
      this.users = data;
    },
    error: err => {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  });
}
loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe({
      next: data => this.incidents = data,
      error: err => console.error('Erreur lors du chargement des incidents', err)
    });
  }
   searchIncidents(): void {
    const filters = this.searchForm.value;
    this.incidentService.searchIncidents(filters).subscribe({
      next: data => this.incidents = data,
      error: err => console.error('Erreur recherche incidents', err)
    });
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.loadIncidents();
  }

  viewIncident(id: number): void {
    this.expandedIncidentId = this.expandedIncidentId === id ? null : id;
  }
toggleIncident(id: number): void {
  if (this.expandedIncidentId === id) {
    this.expandedIncidentId = null;
  } else {
    this.expandedIncidentId = id;
  }
}

updateIncident(id: number): void {
  this.router.navigate(['/updateIncident', id]);
}


deleteIncident(id: number): void {
  if (id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incidentService.deleteIncident(id).subscribe({
          next: () => {
            this.incidents = this.incidents.filter(i => i.id !== id);
            Swal.fire(
              'Supprimé!',
              'L\'incident a été supprimé avec succès.',
              'success'
            );
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression de l\'incident.',
              'error'
            );
          }
        });
      }
    });
  }
}
openUpdateModal(incident: Incident): void {
  this.selectedIncident = { ...incident };

  this.updateForm = this.fb.group({
    typeIncident: [incident.typeIncident, Validators.required],
    natureIncident: [incident.natureIncident, Validators.required],
    criticite: [incident.criticite],
    impact: [incident.impact],
    dateIncident: [incident.dateIncident, Validators.required],
    
  });

  this.showUpdateModal = true;
}




getUserFullName(userId: number): string {
  const user = this.users.find(u => u.idUser === userId);
  return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
}


saveUpdatedIncident(): void {
  if (this.updateForm.valid && this.selectedIncident) {
    const updatedIncident: Incident = {
      ...this.selectedIncident,
      ...this.updateForm.value
    };

    console.log('Données envoyées pour mise à jour:', JSON.stringify(updatedIncident));

    this.incidentService.updateIncident(updatedIncident).subscribe({
      next: (response) => {
        console.log('Réponse de mise à jour:', response);
        const index = this.incidents.findIndex(i => i.id === updatedIncident.id);
        if (index !== -1) {
          this.incidents[index] = response;
        }
        this.showUpdateModal = false;
        Swal.fire('Succès', 'Incident modifié avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur détaillée update incident:', err);
        console.error('URL:', err.url);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        Swal.fire('Erreur', 'Impossible de mettre à jour l\'incident', 'error');
      }
    });
  }
}


fallbackToLocalUsers(userId: number): void {
  const user = this.users.find(u => u.idUser === userId);
  if (user) {
    const updatedIncident: Incident = {
      ...this.selectedIncident,
      ...this.updateForm.value,
      utilisateur: user
    };

    this.incidentService.updateIncident(updatedIncident).subscribe({
      next: (response) => {
        const index = this.incidents.findIndex(i => i.id === updatedIncident.id);
        if (index !== -1) {
          this.incidents[index] = response;
        }
        this.showUpdateModal = false;
        Swal.fire('Succès', 'Incident modifié avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur update incident', err);
        Swal.fire('Erreur', 'Impossible de mettre à jour l\'incident', 'error');
      }
    });
  } else {
    Swal.fire('Erreur', 'Utilisateur non trouvé', 'error');
  }
}


filterByType(event: Event): void {
  const selectElement = event.target as HTMLSelectElement | null;
  if (selectElement) {
    const type = selectElement.value;
    this.incidentService.getIncidentsByType(type).subscribe({
      next: data => this.incidents = data,
      error: err => console.error('Erreur filtrage incidents', err)
    });
  }
}


}