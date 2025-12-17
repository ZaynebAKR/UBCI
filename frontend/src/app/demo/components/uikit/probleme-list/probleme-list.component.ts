import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Probleme } from 'src/app/demo/models/Probleme';
import { ProblemeService } from 'src/app/services/probleme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-probleme-list',
  templateUrl: './probleme-list.component.html',
  styleUrls: ['./probleme-list.component.scss']
})
export class ProblemeListComponent implements OnInit {
  problemeList: Probleme[] = [];
  expandedProblemeIds: number[] = []; 
  motifSearch: string = '';
  
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedProbleme: Probleme | null = null;
  selectedProblemeId!: number;


  constructor(
    private problemeService: ProblemeService, 
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProblemes();
  }

  loadProblemes(): void {
    this.problemeService.getAllProblemes().subscribe({
      next: data => this.problemeList = data,
      error: err => console.error('Erreur lors du chargement des problèmes', err)
    });
  }

  viewProbleme(id: number): void {
    const index = this.expandedProblemeIds.indexOf(id);
    if (index > -1) {
      this.expandedProblemeIds.splice(index, 1);
    } else {
      this.expandedProblemeIds.push(id);
    }
  }

openUpdateModal(probleme: Probleme): void {
  console.log('Opening modal for problem:', probleme);
  console.log('Problem ID:', probleme.idProbleme);
  
  this.selectedProbleme = { ...probleme };
  this.updateForm = this.fb.group({
    entite: [probleme.entite, Validators.required],
    motif: [probleme.motif, Validators.required],
    hCoup: [this.formatDateTimeLocal(probleme.hCoup), Validators.required],
    hReprise: [this.formatDateTimeLocal(probleme.hReprise), Validators.required],
  });
this.selectedProblemeId = probleme.idProbleme!;
  this.showUpdateModal = true;
}




formatDateTimeLocal(time?: string): string {
  if (!time) return '';
  
  try {
    let hours: number, minutes: number;
    
    if (time.includes('h')) {
      const [h, m] = time.split('h');
      hours = parseInt(h, 10);
      minutes = parseInt(m, 10);
    } else {
      const parts = time.split(':');
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
    }
    
    if (isNaN(hours) || isNaN(minutes)) return '';
    
    const today = new Date();
    today.setHours(hours, minutes, 0, 0);
    return today.toISOString().slice(0, 16);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}
  closeUpdateModal(): void {
    this.showUpdateModal = false;
    this.selectedProbleme = null;
  }

saveUpdatedProbleme(): void {
  if (!this.selectedProbleme) {
    console.error('Aucun problème sélectionné');
    return;
  }

  if (!this.selectedProbleme.idProbleme) {
    console.error('⚠️ ID manquant dans selectedProbleme:', this.selectedProbleme);
    Swal.fire('Erreur', 'ID du problème manquant', 'error');
    return;
  }

  if (this.updateForm.invalid) {
    console.error('⚠️ Formulaire invalide');
    Swal.fire('Erreur', 'Formulaire invalide', 'error');
    return;
  }

  const payload: Probleme = {
    ...this.selectedProbleme,
    ...this.updateForm.value,
  };

  this.problemeService.updateProbleme(this.selectedProbleme.idProbleme, payload).subscribe({
    next: (response) => {
      const idx = this.problemeList.findIndex(p => p.idProbleme === this.selectedProbleme!.idProbleme);
      if (idx !== -1) {
        this.problemeList[idx] = response;
      }
      this.showUpdateModal = false;
      Swal.fire('Succès', 'Problème modifié avec succès', 'success');
    },
    error: (err) => {
      console.error('Erreur update problème:', err);
      Swal.fire('Erreur', 'Impossible de mettre à jour le problème', 'error');
    }
  });
}


  deleteProbleme(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment supprimer ce problème ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.problemeService.deleteProbleme(id).subscribe({
          next: () => {
            this.problemeList = this.problemeList.filter(p => p.idProbleme !== id);
            const index = this.expandedProblemeIds.indexOf(id);
            if (index > -1) {
              this.expandedProblemeIds.splice(index, 1);
            }
            Swal.fire('Supprimé !', 'Le problème a été supprimé.', 'success');
          },
          error: () => {
            Swal.fire('Erreur !', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }
  
  isExpanded(id: number): boolean {
    return this.expandedProblemeIds.includes(id);
  }
  
  filterByMotif(): void {
    this.problemeService.getProblemesByMotif(this.motifSearch).subscribe(data => {
      this.problemeList = data;
    });
  }

  resetFilter(): void {
    this.motifSearch = '';
    this.loadProblemes();
  }
}
