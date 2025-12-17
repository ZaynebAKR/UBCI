package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Event;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.EventType;

import java.util.Date;
import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
    Event saveEvent(Event event);
    void deleteEvent(Long id);
    List<Event> findByDate(Date date);
    List<Event> findByEventType(EventType eventType);

    Event updateEvent(Long id, Event updatedEvent);
}