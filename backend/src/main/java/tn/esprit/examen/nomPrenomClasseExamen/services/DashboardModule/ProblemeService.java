package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Probleme;

import java.util.List;
import java.util.Date;

import java.util.Optional;

public interface ProblemeService extends IService<Probleme> {
    List<Probleme> getAllProblemes();
    Probleme getById(Long id);
    Probleme save(Probleme probleme);
    Probleme update(Long id, Probleme probleme);
    void delete(Long id);

    List<Probleme> findByDate(Date date);

    List<Probleme> findByMotif(String motif);
}