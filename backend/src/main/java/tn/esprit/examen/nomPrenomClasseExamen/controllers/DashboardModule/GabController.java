package tn.esprit.examen.nomPrenomClasseExamen.controllers.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Gab;
import tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule.GabService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/gabs")
public class GabController {

    @Autowired
    private GabService gabService;

    @PostMapping
    public Gab createGab(@RequestBody Gab gab) {
        System.out.println("Reçu: " + gab);
        return gabService.saveGab(gab);
    }
    @GetMapping
    public List<Gab> getAllGabs(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        if (date != null) {
            return gabService.findByDate(date);
        }
        return gabService.getAllGabs();
    }

    @GetMapping("/{idGab}")
    public ResponseEntity<Gab> getGabById(@PathVariable Long idGab) {
        Gab gab = gabService.getGabById(idGab);
        if (gab != null) {
            return ResponseEntity.ok(gab);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{idGab}")
    public ResponseEntity<Gab> updateGab(@PathVariable Long idGab, @RequestBody Gab gabDetails) {
        Gab updatedGab = gabService.updateGab(gabDetails, idGab);
        if (updatedGab != null) {
            return ResponseEntity.ok(updatedGab);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idGab}")
    public ResponseEntity<Void> deleteGab(@PathVariable Long idGab) {
        gabService.deleteGab(idGab);
        return ResponseEntity.noContent().build();
    }
}