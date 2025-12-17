package tn.esprit.examen.nomPrenomClasseExamen.controllers.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Mise_En_Prod;
import tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule.Mise_En_ProdService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/production")
public class Mise_En_ProdController {
    @Autowired
    private Mise_En_ProdService miseEnProdService;

    @GetMapping
    public List<Mise_En_Prod> getAllMiseEnProd(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date,
            @RequestParam(required = false) String metier) {

        if (date != null) {
            return miseEnProdService.findByDate(date);
        } else if (metier != null && !metier.isEmpty()) {
            return miseEnProdService.findByMetier(metier);
        }
        return miseEnProdService.getAllMiseEnProd();
    }


    @PostMapping
    public Mise_En_Prod saveMiseEnProd(@RequestBody Mise_En_Prod miseEnProd) {
        return miseEnProdService.saveMiseEnProd(miseEnProd);
    }

    @DeleteMapping("/{id}")
    public void deleteMiseEnProd(@PathVariable Long id) {
        miseEnProdService.deleteMiseEnProd(id);
    }
    @PutMapping("/{id}")
    public Mise_En_Prod updateMiseEnProd(@PathVariable Long id, @RequestBody Mise_En_Prod miseEnProd) {
        miseEnProd.setIdProd(id);
        return miseEnProdService.saveMiseEnProd(miseEnProd);
    }

}