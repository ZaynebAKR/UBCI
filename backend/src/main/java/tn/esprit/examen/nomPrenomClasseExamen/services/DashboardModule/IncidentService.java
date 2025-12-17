package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;

import java.util.Date;
import java.util.List;

public interface IncidentService {
    List<Incident> getAllIncidents();
    Incident saveIncident(Incident incident);
    void deleteIncident(Long id);

    Incident getIncidentById(Long id);

    Incident updateIncident(Long id, Incident incidentDetails);

    List<Incident> findByDate(Date date);

    List<Incident> findAll();
    List<Incident> searchIncidents(Date dateCreation, String nature);
    List<Incident> findByType(String type);
    List<Incident> findByTypeAndDate(String type, Date date);


}

