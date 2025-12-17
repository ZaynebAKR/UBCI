package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Gab;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.GabRepository;

import java.util.Date;
import java.util.List;

@Service
public class GabServiceImpl implements GabService {

    @Autowired
    private GabRepository gabRepository;

    @Override
    public Gab saveGab(Gab gab) {
        return gabRepository.save(gab);
    }

    @Override
    public List<Gab> getAllGabs() {
        return gabRepository.findAll();
    }

    @Override
    public Gab getGabById(Long idGab) {
        return gabRepository.findById(idGab).orElse(null);
    }

    @Override
    public void deleteGab(Long idGab) {
        gabRepository.deleteById(idGab);
    }

    @Override
    public Gab updateGab(Gab gab, Long idGab) {
        Gab existingGab = gabRepository.findById(idGab).orElse(null);
        if (existingGab != null) {
            existingGab.setGabAg(gab.getGabAg());
            existingGab.setJdhHorsService(gab.getJdhHorsService());
            existingGab.setJdhEnService(gab.getJdhEnService());
            existingGab.setJdEnService(gab.getJdEnService());
            existingGab.setMotifIndis(gab.getMotifIndis());
            return gabRepository.save(existingGab);
        }
        return null;
    }
    @Override
    public List<Gab> findByDate(Date date) {
        return gabRepository.findByDate(date);
    }
}