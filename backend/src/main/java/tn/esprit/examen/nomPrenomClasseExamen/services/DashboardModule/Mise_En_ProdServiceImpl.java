package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Mise_En_Prod;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.Mise_En_ProdRepository;

import java.util.Date;
import java.util.List;

@Service
public class Mise_En_ProdServiceImpl implements Mise_En_ProdService {
    @Autowired
    private Mise_En_ProdRepository repository;
    @Override
    public List<Mise_En_Prod> getAllMiseEnProd() {
        return repository.findAll();
    }

    @Override
    public Mise_En_Prod saveMiseEnProd(Mise_En_Prod miseEnProd) {
        return repository.save(miseEnProd);
    }

    @Override
    public void deleteMiseEnProd(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Mise_En_Prod> findByDate(Date date) {
        return repository.findByDateMiseEnProd(date);
    }

    @Override
    public List<Mise_En_Prod> getAll() {
        return null;
    }

    @Override
    public Mise_En_Prod save(Mise_En_Prod miseEnProd) {
        return null;
    }

    @Override
    public void delete(Long id) {
    }
    @Override
    public List<Mise_En_Prod> findByMetier(String metier) {
        return repository.findByMetier(metier);
    }

}

