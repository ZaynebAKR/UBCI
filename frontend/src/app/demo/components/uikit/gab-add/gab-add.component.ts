import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gab } from 'src/app/demo/models/Gab';
import { GabService } from 'src/app/services/gab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gab-add',
  templateUrl: './gab-add.component.html',
  styleUrls: ['./gab-add.component.scss']
})
export class GabAddComponent implements OnInit {
  gabForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gabService: GabService,
    private router: Router
  ) {
    this.gabForm = this.fb.group({
      gabAg: ['', Validators.required],
      jdhHorsService: ['', Validators.required],
      jdhEnService: ['', Validators.required],
      jdEnService: ['', Validators.required],
      motifIndis: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  saveGab(): void {
    if (this.gabForm.valid) {
      const gabData = this.gabForm.value;

      this.gabService.createGab(gabData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Succès !',
            text: 'Le GAB a été ajouté avec succès.',
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
            text: err.error?.message || 'Échec lors de l\'ajout du GAB.',
            icon: 'error',
            confirmButtonText: 'Fermer'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.gabForm);

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
    this.gabForm.reset();
    this.router.navigate(['/dashboard']); 
  }
}