import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType, EventTypeDisplay, IEvent } from 'src/app/demo/models/IEvent';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit {
 events: IEvent[] = [];
  eventTypes = Object.values(EventType);
  EventTypeDisplay = EventTypeDisplay;
  newEventFormGroup!: FormGroup;  
  
  newEvent: IEvent = {
    eventType: EventType.DEBUT_BATCH_ATLAS_II,
    scheduledTime: '',
    fictionalTime: ''
  }; 

  constructor(
      private eventService: EventService,
      private fb: FormBuilder,
      private router: Router
    
  ) { }


    ngOnInit(): void {
      this.newEventFormGroup = this.fb.group({
        eventType: ['', Validators.required],
        scheduledTime: ['', Validators.required],
        fictionalTime: ['', Validators.required]
      });
    }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: IEvent[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

addEvent(): void {
  this.eventService.createEvent(this.newEvent).subscribe(
    () => {
      this.newEvent = {
        eventType: EventType.DEBUT_BATCH_ATLAS_II,
        scheduledTime: '',
        fictionalTime: ''
      };

      Swal.fire({
        title: 'Succès !',
        text: 'Événement ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de l\'événement :', error);

      Swal.fire({
        title: 'Erreur !',
        text: error.error?.message || 'Une erreur est survenue lors de l\'ajout de l\'événement.',
        icon: 'error',
        confirmButtonText: 'Fermer'
      });
    }
  );
}



  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.loadEvents();
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }

  getEventDisplayName(eventType: EventType): string {
    return EventTypeDisplay[eventType];
  }

  
}