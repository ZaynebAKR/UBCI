package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NbrGAB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int nbreGAB;
    private int nbreGABH;
    private float tauxDis;
    private float tauxDisMois;

    private LocalDateTime dateCreationNbrGAB;

    @PrePersist
    protected void onCreate() {
        this.dateCreationNbrGAB = LocalDateTime.now();
    }
}
