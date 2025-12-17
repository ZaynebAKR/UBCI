package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Event;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.EventType;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.EventRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<Event> findByDate(Date date) {
        return eventRepository.findByEventDate(date);
    }
    @Override
    public List<Event> findByEventType(EventType eventType) {
        return eventRepository.findByEventType(eventType);
    }
    public Event updateEvent(Long id, Event updatedEvent) {
        Optional<Event> existingEventOpt = eventRepository.findById(id);
        if (existingEventOpt.isPresent()) {
            Event existingEvent = existingEventOpt.get();
            existingEvent.setEventType(updatedEvent.getEventType());
            existingEvent.setScheduledTime(updatedEvent.getScheduledTime());
            existingEvent.setFictionalTime(updatedEvent.getFictionalTime());
            return eventRepository.save(existingEvent);
        } else {
            return null;
        }
    }
}