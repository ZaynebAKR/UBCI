import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Probleme } from 'src/app/demo/models/Probleme';
import { ProblemeService } from 'src/app/services/probleme.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.scss']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  problemeList: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private problemeService: ProblemeService,
    private router: Router
  ) {
    this.problemeForm = this.fb.group({
      entite: ['', Validators.required],
      hCoup: ['', Validators.required],
      hReprise: ['', Validators.required],
      motif: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProblemes();
  }

  loadProblemes() {
    this.problemeService.getAllProblemes().subscribe({
      next: (data) => {
        this.problemeList = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des problèmes:', error);
      }
    });
  }

  onSubmit() {
    if (this.problemeForm.valid) {
      const formData = this.problemeForm.value;

      this.problemeService.createProbleme(formData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Succès!',
            text: 'Problème ajouté avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.problemeForm.reset();
            this.loadProblemes();
            this.router.navigate(['/dashboard']);
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          Swal.fire({
            title: 'Erreur!',
            text: error.error?.message || 'Une erreur est survenue lors de l\'ajout du problème.',
            icon: 'error',
            confirmButtonText: 'Fermer'
          });
        }
      });
    }
  }

}