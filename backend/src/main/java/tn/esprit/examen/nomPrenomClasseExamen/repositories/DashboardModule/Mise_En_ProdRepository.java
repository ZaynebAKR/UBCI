package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Mise_En_Prod;

import java.util.Date;
import java.util.List;

@Repository
public interface Mise_En_ProdRepository extends JpaRepository<Mise_En_Prod, Long> {
    @Query("SELECT Mise_En_Prod FROM Mise_En_Prod Mise_En_Prod WHERE DATE(Mise_En_Prod.dateCreationProd) = DATE(:date)")
    List<Mise_En_Prod> findByDateMiseEnProd(@Param("date") Date date);

    @Query("SELECT m FROM Mise_En_Prod m WHERE m.metier = :metier")
    List<Mise_En_Prod> findByMetier(@Param("metier") String metier);

}
