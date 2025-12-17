package tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.NbrGAB;

import java.util.Date;
import java.util.List;

@Repository

public interface NbrGABRepository extends JpaRepository<NbrGAB, Long> {
    @Query("SELECT n FROM NbrGAB n WHERE DATE(n.dateCreationNbrGAB) = DATE(:date)")
    List<NbrGAB> findByDateStat(@Param("date") Date date);
    @Query("SELECT n FROM NbrGAB n WHERE n.tauxDisMois BETWEEN :tauxDisMois - 0.01 AND :tauxDisMois + 0.01")
    List<NbrGAB> findByTauxDisMois(@Param("tauxDisMois") Float tauxDisMois);


}
