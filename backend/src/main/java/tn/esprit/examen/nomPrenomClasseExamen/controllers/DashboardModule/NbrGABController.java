package tn.esprit.examen.nomPrenomClasseExamen.controllers.DashboardModule;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.NbrGAB;
import tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule.NbrGABService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/nbrgabs")
public class NbrGABController {
    private final NbrGABService nbrGABService;

    public NbrGABController(NbrGABService service) {
        this.nbrGABService = service;
    }


    @GetMapping("/{id}")
    public NbrGAB getById(@PathVariable Long id) {
        return nbrGABService.getNbrGABById(id);
    }

    @PutMapping("/{id}")
    public NbrGAB update(@PathVariable Long id, @RequestBody NbrGAB nbrGAB) {
        return nbrGABService.updateNbrGAB(id, nbrGAB);
    }
    @GetMapping
    public List<NbrGAB> getAllNbrGabs(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date,
            @RequestParam(required = false) Float tauxDisMois) {

        if (date != null) {
            return nbrGABService.findByDate(date);
        } else if (tauxDisMois != null) {
            return nbrGABService.findByTauxDisMois(tauxDisMois);
        } else {
            return nbrGABService.getAllNbrGabs();
        }
    }



    @PostMapping
    public NbrGAB saveNbrGAB(@RequestBody NbrGAB nbrGAB) {
        return nbrGABService.saveNbrGAB(nbrGAB);
    }

    @DeleteMapping("/{id}")
    public void deleteNbrGAB(@PathVariable Long id) {
        nbrGABService.deleteNbrGAB(id);
    }
}
