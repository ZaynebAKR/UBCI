package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.TypeIncident;

import java.util.Date;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    @Query("SELECT i FROM Incident i WHERE DATE(i.dateCreationIncident) = DATE(:date)")
    List<Incident> findByDateIncident(@Param("date") Date date);
    List<Incident> findByDateCreationIncident(Date dateCreation);
    List<Incident> findByNatureIncident(String nature);
    List<Incident> findByDateCreationIncidentAndNatureIncident(Date dateCreation, String nature);
    List<Incident> findByTypeIncident(TypeIncident typeIncident);

    @Query("SELECT i FROM Incident i WHERE i.typeIncident = :typeIncident AND DATE(i.dateCreationIncident) = DATE(:date)")
    List<Incident> findByTypeIncidentAndDateCreationIncident(@Param("typeIncident") TypeIncident typeIncident,
                                                             @Param("date") Date date);

}
