package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Probleme;

import java.util.Date;
import java.util.List;

@Repository
public interface ProblemeRepository extends JpaRepository<Probleme, Long> {
    @Query("SELECT p FROM Probleme p WHERE DATE(p.dateCreationProb) = DATE(:date)")
    List<Probleme> findByDateProbleme(@Param("date") Date date);

    @Query("SELECT p FROM Probleme p WHERE LOWER(p.motif) LIKE LOWER(CONCAT('%', :motif, '%'))")
    List<Probleme> findByMotifContaining(@Param("motif") String motif);
}