package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Event;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.EventType;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e WHERE DATE(e.dateCreationEvent) = DATE(:date)")
    List<Event> findByEventDate(@Param("date") Date date);

    @Query("SELECT e FROM Event e WHERE e.eventType = :eventType")
    List<Event> findByEventType(@Param("eventType") EventType eventType);


}
