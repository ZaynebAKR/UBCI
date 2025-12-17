package tn.esprit.examen.nomPrenomClasseExamen.controllers.DashboardModule;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Probleme;
import tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule.ProblemeService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/problemes")
public class ProblemeController {
    private final ProblemeService problemeService;

    public ProblemeController(ProblemeService problemeService) {
        this.problemeService = problemeService;
    }

    @PostMapping
    public Probleme create(@RequestBody Probleme probleme) {
        return problemeService.save(probleme);
    }

    @GetMapping
    public List<Probleme> getAllProblemes(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        if (date != null) {
            return problemeService.findByDate(date);
        }
        return problemeService.getAllProblemes();
    }
    @GetMapping("/filter")
    public List<Probleme> filterByMotif(@RequestParam(required = false) String motif) {
        return problemeService.findByMotif(motif);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Probleme> getById(@PathVariable Long id) {
        try {
            Probleme probleme = problemeService.getById(id);
            if (probleme != null) {
                return ResponseEntity.ok(probleme);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Probleme> update(@PathVariable Long id, @RequestBody Probleme problemeDetails) {
        try {
            Probleme updatedProbleme = problemeService.update(id, problemeDetails);
            return ResponseEntity.ok(updatedProbleme);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        problemeService.delete(id);
    }
}