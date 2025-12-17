import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gab } from 'src/app/demo/models/Gab';
import { GabService } from 'src/app/services/gab.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gab-list',
  templateUrl: './gab-list.component.html',
  styleUrls: ['./gab-list.component.scss']
})
export class GabListComponent implements OnInit {
  gabs: Gab[] = [];
  expandedGabId: number | null = null;
  motifsIndisponibilite: string[] = ['Maintenance', 'Panne', 'Autre'];

  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedGab: Gab | null = null;

  constructor(private gabService: GabService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadGabs();
  }

  updateGab(gab: Gab): void {
    this.openUpdateModal(gab);
  }

  viewGab(idGab: number): void {
    this.expandedGabId = this.expandedGabId === idGab ? null : idGab;
  }

  filterByMotif(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const motif = selectElement.value;
      if (motif) {
        this.gabService.getAllGabs().subscribe({
          next: data => this.gabs = data.filter(g => g.motifIndis === motif),
          error: err => console.error('Erreur filtrage GABs', err)
        });
      } else {
        this.loadGabs();
      }
    }
  }

  loadGabs(): void {
    this.gabService.getAllGabs().subscribe({
      next: (data) => this.gabs = data,
      error: (err) => console.error('Erreur lors du chargement des GABs', err)
    });
  }

  private formatDateTimeLocal(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  }

  openUpdateModal(gab: Gab): void {
    this.selectedGab = { ...gab };
    this.updateForm = this.fb.group({
      gabAg: [gab.gabAg, Validators.required],
      motifIndis: [gab.motifIndis, Validators.required],
      jdhEnService: [this.formatDateTimeLocal(gab.jdhEnService)],
      jdhHorsService: [this.formatDateTimeLocal(gab.jdhHorsService)]
    });
    this.showUpdateModal = true;
  }

  saveUpdatedGab(): void {
    if (this.updateForm.valid && this.selectedGab) {
      const formVal = this.updateForm.value;
      const payload: Gab = {
        ...this.selectedGab,
        ...formVal,
        jdhEnService: formVal.jdhEnService ? new Date(formVal.jdhEnService) : null,
        jdhHorsService: formVal.jdhHorsService ? new Date(formVal.jdhHorsService) : null
      };

      this.gabService.updateGab(payload.idGab!, payload).subscribe({
        next: (response) => {
          const idx = this.gabs.findIndex(g => g.idGab === payload.idGab);
          if (idx !== -1) this.gabs[idx] = response;
          this.showUpdateModal = false;
          Swal.fire('Succès', 'GAB modifié avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur update gab:', err);
          Swal.fire('Erreur', 'Impossible de mettre à jour le GAB', 'error');
        }
      });
    }
  }

  deleteGab(idGab: number): void {
    if (!idGab) return;
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gabService.deleteGab(idGab).subscribe({
          next: () => {
            this.gabs = this.gabs.filter(g => g.idGab !== idGab);
            Swal.fire('Supprimé!', 'Le GAB a été supprimé.', 'success');
          },
          error: () => {
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }
}
