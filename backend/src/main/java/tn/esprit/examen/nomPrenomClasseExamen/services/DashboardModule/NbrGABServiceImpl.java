package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.NbrGAB;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.NbrGABRepository;

import java.util.Date;
import java.util.List;

@Service

public class NbrGABServiceImpl implements NbrGABService {

    private final NbrGABRepository repository;

    public NbrGABServiceImpl(NbrGABRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<NbrGAB> getAllNbrGABs() {
        return repository.findAll();
    }

    @Override
    public NbrGAB getNbrGABById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public NbrGAB updateNbrGAB(Long id, NbrGAB nbrGAB) {
        NbrGAB existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setNbreGAB(nbrGAB.getNbreGAB());
            existing.setNbreGABH(nbrGAB.getNbreGABH());
            existing.setTauxDis(nbrGAB.getTauxDis());
            existing.setTauxDisMois(nbrGAB.getTauxDisMois());
            return repository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteNbrGAB(Long id) {
        repository.deleteById(id);
    }
    @Override
    public List<NbrGAB> getAllNbrGabs() {
        return repository.findAll();
    }

    @Override
    public NbrGAB saveNbrGAB(NbrGAB nbrGAB) {
        return repository.save(nbrGAB);
    }


    @Override
    public List<NbrGAB> findByDate(Date date) {
        return repository.findByDateStat(date);
    }
    @Override
    public List<NbrGAB> findByTauxDisMois(Float tauxDisMois) {
        return repository.findByTauxDisMois(tauxDisMois);
    }


}