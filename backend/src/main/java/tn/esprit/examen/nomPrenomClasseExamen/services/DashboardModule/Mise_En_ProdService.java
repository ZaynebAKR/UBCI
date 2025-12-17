package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.Mise_En_Prod;

import java.util.Date;
import java.util.List;

public interface Mise_En_ProdService extends IService<Mise_En_Prod>{
    List<Mise_En_Prod> getAllMiseEnProd();
    Mise_En_Prod saveMiseEnProd(Mise_En_Prod miseEnProd);
    void deleteMiseEnProd(Long id);
    List<Mise_En_Prod> findByDate(Date date);
    List<Mise_En_Prod> findByMetier(String metier);

}
