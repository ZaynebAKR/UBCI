import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiseEnProd } from 'src/app/demo/models/MiseEnProd';
import { MiseEnProdService } from 'src/app/services/mise-en-prod.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mise-en-prod-list',
  templateUrl: './mise-en-prod-list.component.html',
  styleUrls: ['./mise-en-prod-list.component.scss']
})
export class MiseEnProdListComponent implements OnInit {
  list: MiseEnProd[] = [];
  expandedProdId: number | null = null;
  searchMetier: string = '';

  selectedProd: MiseEnProd | null = null;
  showUpdateModal: boolean = false;
  updateForm!: FormGroup;

  constructor(
    private service: MiseEnProdService, 
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const params: any = {};
    if (this.searchMetier.trim() !== '') {
      params.metier = this.searchMetier.trim();
    }
    this.service.getAll(params).subscribe(data => this.list = data);
  }

  filterByMetier() {
    this.loadData();
  }

  viewProd(id: number) {
    this.expandedProdId = this.expandedProdId === id ? null : id;
  }

  deleteProd(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            this.list = this.list.filter(p => p.idProd !== id);
            Swal.fire('Supprimé !', 'La mise en production a été supprimée.', 'success');
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire('Erreur !', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }

  openUpdateModal(prod: MiseEnProd): void {
    this.selectedProd = { ...prod };
    this.updateForm = this.fb.group({
      application: [prod.application, Validators.required],
      metier: [prod.metier, Validators.required],
    });
    this.showUpdateModal = true;
  }

  saveUpdatedProd(): void {
    if (this.updateForm.valid && this.selectedProd) {
      const updatedProd: MiseEnProd = {
        ...this.selectedProd,
        ...this.updateForm.value
      };

      this.service.update(updatedProd).subscribe({
        next: (response) => {
          const index = this.list.findIndex(p => p.idProd === updatedProd.idProd);
          if (index !== -1) {
            this.list[index] = response;
          }
          this.showUpdateModal = false;
          Swal.fire('Succès', 'Mise en production modifiée avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur update mise en prod:', err);
          Swal.fire('Erreur', 'Impossible de mettre à jour la mise en production', 'error');
        }
      });
    }
  }
}
