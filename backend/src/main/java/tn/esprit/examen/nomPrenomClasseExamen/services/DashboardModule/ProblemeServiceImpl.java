package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Probleme;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.ProblemeRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class ProblemeServiceImpl implements ProblemeService {

    @Autowired
    private ProblemeRepository problemeRepository;

    @Override
    public List<Probleme> getAllProblemes() {
        return problemeRepository.findAll();
    }
    @Override
    public List<Probleme> getAll() {
        return null;
    }
    @Override
    public List<Probleme> findByDate(Date date) {
        return problemeRepository.findByDateProbleme(date);
    }
    @Override
    public Probleme getById(Long id) {
        return problemeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident non trouvé"));
    }
    @Override
    public List<Probleme> findByMotif(String motif) {
        if (motif == null || motif.isEmpty()) {
            return problemeRepository.findAll();
        }
        return problemeRepository.findByMotifContaining(motif);
    }

    @Override
    public Probleme save(Probleme probleme) {
        return problemeRepository.save(probleme);
    }
    @Override
    public Probleme update(Long id, Probleme probleme) {
        return problemeRepository.findById(id)
                .map(existingProbleme -> {
                    existingProbleme.setEntite(probleme.getEntite());
                    existingProbleme.setMotif(probleme.getMotif());
                    existingProbleme.setHCoup(probleme.getHCoup());
                    existingProbleme.setHReprise(probleme.getHReprise());
                    return problemeRepository.save(existingProbleme);
                })
                .orElseThrow(() -> new RuntimeException("Problème non trouvé avec l'id: " + id));
    }
    @Override
    public void delete(Long id) {
        problemeRepository.deleteById(id);
    }
}
