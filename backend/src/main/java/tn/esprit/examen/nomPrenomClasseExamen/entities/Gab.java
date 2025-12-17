package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Gab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGab;
    private String gabAg;
    private LocalDateTime jdhHorsService;
    private LocalDateTime jdhEnService;
    private LocalDateTime jdEnService;
    private String motifIndis;
    private LocalDateTime dateCreationGAB;

    @PrePersist
    protected void onCreate() {
        this.dateCreationGAB = LocalDateTime.now();
    }

}