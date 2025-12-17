import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbrGAB } from 'src/app/demo/models/NbrGAB';
import { NbrGabService } from 'src/app/services/nbr-gab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nbr-gab-add',
  templateUrl: './nbr-gab-add.component.html',
  styleUrls: ['./nbr-gab-add.component.scss']
})
export class NbrGabAddComponent implements OnInit {
  nbrGabForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nbrGabService: NbrGabService,
    private router: Router
  ) {
    this.nbrGabForm = this.fb.group({
      nbreGAB: ['', Validators.required],
      nbreGABH: ['', Validators.required],
      tauxDis: ['', Validators.required],
      tauxDisMois: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  saveNbrGab(): void {
    if (this.nbrGabForm.valid) {
      const nbrGabData: NbrGAB = this.nbrGabForm.value;

      this.nbrGabService.create(nbrGabData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Succès !',
            text: 'Le NbrGAB a été ajouté avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        error: (err) => {
          console.error('Erreur complète:', err);
          Swal.fire({
            title: 'Erreur !',
            text: err.error?.message || 'Échec lors de l\'ajout du NbrGAB.',
            icon: 'error',
            confirmButtonText: 'Fermer'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.nbrGabForm);

      Swal.fire({
        title: 'Formulaire invalide',
        text: 'Merci de remplir tous les champs obligatoires.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel(): void {
    this.nbrGabForm.reset();
    this.router.navigate(['/dashboard']); 
  }
}
