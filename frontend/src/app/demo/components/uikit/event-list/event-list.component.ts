import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvent, EventType, EventTypeDisplay } from 'src/app/demo/models/IEvent';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: IEvent[] = [];
  expandedEventId: number | null = null; 
  selectedEventType: string = ''; 
  selectedEvent: IEvent | null = null;
  showUpdateModal: boolean = false;
  updateForm!: FormGroup;
  eventTypes: string[] = [
  'DEBUT_BATCH_ATLAS_II',
  'OUVERTURE_TP',
  'OUVERTURE_GIP',
  'ENVOI_IRREGULIERS',
  'OUVERTURE_INFOCENTRE',
  'FIN_BATCH_ATLAS_II'
];


  constructor(private eventService: EventService, private router: Router ,     private fb: FormBuilder
) {}

  ngOnInit(): void {
    this.loadEvents();
  }



  loadEvents(): void {
  const params: any = {};
  if (this.selectedEventType) {
    params.eventType = this.selectedEventType;
  }

  this.eventService.getAllEvents(params).subscribe({
    next: (data) => (this.events = data),
    error: (err) => console.error('Erreur lors du chargement des événements', err)
  });
}
  getDisplayEventType(eventType: EventType): string {
    return EventTypeDisplay[eventType] || eventType;
  }

  viewEvent(id?: number): void {
    if (id !== undefined) {
      this.expandedEventId = this.expandedEventId === id ? null : id;
    }
  }

  editEvent(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/event/edit', id]);
    }
  }

deleteEvent(id?: number): void {
  if (id !== undefined) {
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
        this.eventService.deleteEvent(id).subscribe({
          next: () => {
            this.events = this.events.filter(e => e.id !== id);
            Swal.fire(
              'Supprimé!',
              'L\'événement a été supprimé.',
              'success'
            );
          },
          error: (err) => {
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression de l\'événement.',
              'error'
            );
          }
        });
      }
    });
  }
}
openUpdateModal(event: IEvent): void {
    this.selectedEvent = { ...event }; 
    this.updateForm = this.fb.group({
      eventType: [event.eventType, Validators.required],
      scheduledTime: [event.scheduledTime, Validators.required],
      fictionalTime: [event.fictionalTime]
    });
    this.showUpdateModal = true;
  }
  saveUpdatedEvent(): void {
    if (this.updateForm.valid && this.selectedEvent) {
      const updatedEvent: IEvent = {
        ...this.selectedEvent,
        ...this.updateForm.value
      };

      this.eventService.updateEvent(updatedEvent.id!, updatedEvent).subscribe({
        next: (response) => {
          const index = this.events.findIndex(e => e.id === updatedEvent.id);
          if (index !== -1) this.events[index] = response;
          this.showUpdateModal = false;
          Swal.fire('Succès', 'Événement modifié avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur update Event:', err);
          Swal.fire('Erreur', 'Impossible de mettre à jour cet événement', 'error');
        }
      });
    }
  }
}