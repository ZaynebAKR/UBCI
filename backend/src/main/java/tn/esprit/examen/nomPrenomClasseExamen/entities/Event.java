package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.EventType;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private LocalTime scheduledTime;
    private LocalTime fictionalTime;
    private LocalDateTime dateCreationEvent;

    @PrePersist
    protected void onCreate() {
        this.dateCreationEvent = LocalDateTime.now();
    }
}