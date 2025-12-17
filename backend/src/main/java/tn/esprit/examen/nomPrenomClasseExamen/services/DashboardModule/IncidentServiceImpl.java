package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;
import tn.esprit.examen.nomPrenomClasseExamen.entities.User;
import tn.esprit.examen.nomPrenomClasseExamen.entities.enums.TypeIncident;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.DashboardModule.IncidentRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UsersModule.IUserRepository;

import java.util.Date;
import java.util.List;

@Service
public class IncidentServiceImpl  implements IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @Override
    public Incident saveIncident(Incident incident) {
        if (incident.getTypeIncident() == null || incident.getNatureIncident() == null) {
            throw new IllegalArgumentException("Type et nature de l'incident sont obligatoires");
        }

        if (incident.getImpact() == null || incident.getImpact().isEmpty() ||
                incident.getCriticite() == null || incident.getCriticite().isEmpty()) {
            throw new IllegalArgumentException("Impact et criticité sont obligatoires");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUsername);

        if (currentUser != null) {
            incident.setUser(currentUser);
        }

        return incidentRepository.save(incident);
    }

    @Override
    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }

    @Override
    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident non trouvé"));
    }

    @Override
    public Incident updateIncident(Long id, Incident incidentDetails) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident non trouvé"));

        incident.setTypeIncident(incidentDetails.getTypeIncident());
        incident.setNatureIncident(incidentDetails.getNatureIncident());
        incident.setCriticite(incidentDetails.getCriticite());
        incident.setImpact(incidentDetails.getImpact());
        incident.setDateIncident(incidentDetails.getDateIncident());


        return incidentRepository.save(incident);
    }
    public List<Incident> findByDate(Date date) {
        return incidentRepository.findByDateIncident(date);
    }

    public List<Incident> findAll() {
        return incidentRepository.findAll();
    }
    @Override
    public List<Incident> searchIncidents(Date dateCreation, String nature) {
        if (dateCreation != null && nature != null) {
            return incidentRepository.findByDateCreationIncidentAndNatureIncident(dateCreation, nature);
        } else if (dateCreation != null) {
            return incidentRepository.findByDateCreationIncident(dateCreation);
        } else if (nature != null) {
            return incidentRepository.findByNatureIncident(nature);
        } else {
            return incidentRepository.findAll();
        }
    }
    @Override
    public List<Incident> findByType(String type) {
        return incidentRepository.findByTypeIncident(TypeIncident.valueOf(type.toUpperCase()));
    }

    @Override
    public List<Incident> findByTypeAndDate(String type, Date date) {
        return incidentRepository.findByTypeIncidentAndDateCreationIncident(
                TypeIncident.valueOf(type.toUpperCase()), date);
    }

}