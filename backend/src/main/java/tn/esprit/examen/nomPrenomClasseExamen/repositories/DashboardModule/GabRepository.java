package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Gab;

import java.util.Date;
import java.util.List;

@Repository
public interface GabRepository extends JpaRepository<Gab, Long> {
    @Query("SELECT g FROM Gab g WHERE DATE(g.dateCreationGAB) = DATE(:date) OR DATE(g.dateCreationGAB) = DATE(:date)")
    List<Gab> findByDate(@Param("date") Date date);
}
