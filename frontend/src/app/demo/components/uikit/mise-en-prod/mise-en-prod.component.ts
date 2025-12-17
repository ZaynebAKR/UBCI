import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiseEnProdService } from 'src/app/services/mise-en-prod.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mise-en-prod',
  templateUrl: './mise-en-prod.component.html',
  styleUrls: ['./mise-en-prod.component.scss']
})
export class MiseEnProdComponent {
   form: FormGroup;

  constructor(private fb: FormBuilder, private service: MiseEnProdService , private router: Router) {
    this.form = this.fb.group({
      application: ['', Validators.required],
      metier: ['', Validators.required],
      
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe({
        next: () => {
          Swal.fire('Succès !', 'Mise en production ajoutée avec succès.', 'success').then(() => {
            this.router.navigateByUrl('/dashboard'); 
          });
          this.form.reset();
        },
        error: (err) => {
          Swal.fire('Erreur !', err.error?.message || 'Échec lors de l\'ajout.', 'error');
        }
      });
    }
  }
}