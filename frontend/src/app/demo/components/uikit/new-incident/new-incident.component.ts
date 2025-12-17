import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/demo/services/user.service';
import { IncidentService } from 'src/app/services/incident.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  newIncidentFormGroup!: FormGroup;  
  isIncidentDuJour: boolean = false;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private userService: UserService, 
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.newIncidentFormGroup = this.fb.group({
      incidentType: ['', Validators.required],
      natureIncident: ['', Validators.required],
      impact: ['', Validators.required],
      criticite: ['', Validators.required],
      dateIncident: ['', Validators.required],
      userId: ['', Validators.required]
    });
 this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur chargement users', err)
    });

    this.newIncidentFormGroup.get('incidentType')?.valueChanges.subscribe(value => {
      if (value === 'INCIDENTS_DU_JOUR') {
        this.isIncidentDuJour = true;

        const today = new Date().toISOString().slice(0, 10); 
        this.newIncidentFormGroup.patchValue({ dateIncident: today });

        this.newIncidentFormGroup.get('dateIncident')?.disable();
      } else {
        this.isIncidentDuJour = false;

        this.newIncidentFormGroup.get('dateIncident')?.enable();
        this.newIncidentFormGroup.patchValue({ dateIncident: '' });
      }
    });
  }
 
 handleSaveIncident() {
  if (this.newIncidentFormGroup.valid) {

  let formValue = this.newIncidentFormGroup.value;

let incidentData: any = {
  typeIncident: formValue.incidentType.toUpperCase(),
  natureIncident: formValue.natureIncident.toUpperCase(),
  impact: formValue.impact,
  criticite: formValue.criticite,
  dateIncident: this.newIncidentFormGroup.getRawValue().dateIncident ,
  user: { id: formValue.userId } 
};

if (formValue.incidentType === 'INCIDENTS_DU_JOUR') {
  incidentData.dateDuJour = new Date().toISOString().slice(0, 10);
}



    console.log('Données envoyées:', incidentData); 

    this.incidentService.saveIncident(incidentData).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
        Swal.fire({
          title: 'Succès !',
          text: 'Incident ajouté avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Erreur complète:', error);
        Swal.fire({
          title: 'Erreur !',
          text: error.error?.message || 'Échec lors de l\'ajout de l\'incident.',
          icon: 'error',
          confirmButtonText: 'Fermer'
        });
      }
    });
  }
}
 handleCancel() {
    this.newIncidentFormGroup.setValue({
          incidentType: '',
          natureIncident: '',
          impact: '',
          criticite: '',
          dateIncident: ''
        }); 
  }
}
