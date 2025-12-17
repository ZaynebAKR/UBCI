package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.NbrGAB;

import java.util.Date;
import java.util.List;

public interface NbrGABService {
    NbrGAB saveNbrGAB(NbrGAB nbrGAB);
    List<NbrGAB> getAllNbrGABs();
    NbrGAB getNbrGABById(Long id);
    NbrGAB updateNbrGAB(Long id, NbrGAB nbrGAB);
    void deleteNbrGAB(Long id);
    List<NbrGAB> getAllNbrGabs();
    List<NbrGAB> findByDate(Date date);
    List<NbrGAB> findByTauxDisMois(Float tauxDisMois);

}
