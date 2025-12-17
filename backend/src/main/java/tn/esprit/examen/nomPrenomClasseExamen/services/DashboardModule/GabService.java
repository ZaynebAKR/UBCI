package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.Gab;

import java.util.Date;
import java.util.List;

public interface GabService {
    Gab saveGab(Gab gab);
    List<Gab> getAllGabs();
    Gab getGabById(Long idGab);
    void deleteGab(Long idGab);
    Gab updateGab(Gab gab, Long idGab);
    List<Gab> findByDate(Date date);

}