package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.NatureIncident;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.TypeIncident;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String impact;
    private String criticite;
    private LocalDate dateIncident;
    private LocalDate dateDuJour;
    @Enumerated(EnumType.STRING)
    private TypeIncident typeIncident;

    @Enumerated(EnumType.STRING)
    private NatureIncident natureIncident;

    @ManyToOne
    private User user;
    private LocalDateTime dateCreationIncident;

    @PrePersist
    protected void onCreate() {
        this.dateCreationIncident = LocalDateTime.now();
    }
}
