import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbrGAB } from 'src/app/demo/models/NbrGAB';
import { NbrGabService } from 'src/app/services/nbr-gab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nbr-gab-list',
  templateUrl: './nbr-gab-list.component.html',
  styleUrls: ['./nbr-gab-list.component.scss']
})
export class NbrGabListComponent implements OnInit {
  gabs: NbrGAB[] = [];
  expandedGabId: number | null = null;
  filterType: 'date' | 'tauxDisMois' = 'date';
  filterValue: string | number | null = null;
    selectedGab: NbrGAB | null = null;
  showUpdateModal: boolean = false;
  updateForm!: FormGroup;

  constructor(
    private gabService: NbrGabService, 
    private router: Router , 
       private fb: FormBuilder
) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(params?: any) {
    this.gabService.getAll(params).subscribe(data => {
      this.gabs = data;
    });
  }

 applyFilter() {
    if (!this.filterValue) {
      Swal.fire('Erreur', 'Veuillez saisir une valeur pour filtrer', 'warning');
      return;
    }

    const params: any = {};
    if (this.filterType === 'date') {
      params.date = this.filterValue;
    } else if (this.filterType === 'tauxDisMois') {
      params.tauxDisMois = this.filterValue;
    }

    this.loadData(params);
  }

  resetFilter() {
    this.filterValue = null;
    this.loadData();
  }
    viewGab(id: number) {
    if (id) {
      this.expandedGabId = this.expandedGabId === id ? null : id;
    }
  }

  // ✅ Modifier / Update
  editGab(id: number) {
    if (id) {
      this.router.navigate(['/nbr-gabs/edit', id]);
    }
  }

  // ✅ Supprimer avec confirmation
  deleteGab(id: number) {
    if (id) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gabService.delete(id).subscribe({
            next: () => {
              this.gabs = this.gabs.filter(g => g.id !== id);
              Swal.fire('Supprimé!', 'Le NbrGAB a été supprimé.', 'success');
            },
            error: () => {
              Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
            }
          });
        }
      });
    }
  }
  openUpdateModal(gab: NbrGAB): void {
    this.selectedGab = { ...gab }; // clone
    this.updateForm = this.fb.group({
      nbreGAB: [gab.nbreGAB, Validators.required],
      nbreGABH: [gab.nbreGABH, Validators.required],
      tauxDis: [gab.tauxDis, [Validators.required, Validators.min(0)]],
      tauxDisMois: [gab.tauxDisMois, [Validators.required, Validators.min(0)]]
    });
    this.showUpdateModal = true;
  }
  saveUpdatedGab(): void {
    if (this.updateForm.valid && this.selectedGab) {
      const updatedGab: NbrGAB = {
        ...this.selectedGab,
        ...this.updateForm.value
      };

      this.gabService.update(updatedGab.id!, updatedGab).subscribe({
        next: (response) => {
          const index = this.gabs.findIndex(g => g.id === updatedGab.id);
          if (index !== -1) this.gabs[index] = response;
          this.showUpdateModal = false;
          Swal.fire('Succès', 'NbrGAB modifié avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur update NbrGAB:', err);
          Swal.fire('Erreur', 'Impossible de mettre à jour ce NbrGAB', 'error');
        }
      });
    }
  }
}