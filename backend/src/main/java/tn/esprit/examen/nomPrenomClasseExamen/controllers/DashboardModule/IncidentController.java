    package tn.esprit.examen.nomPrenomClasseExamen.controllers.DashboardModule;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.format.annotation.DateTimeFormat;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import tn.esprit.examen.nomPrenomClasseExamen.entities.Incident;
    import tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule.IncidentService;

    import java.util.Date;
    import java.util.List;
    @CrossOrigin(origins = "http://localhost:4200")
    @RestController
    @RequestMapping("/incidents")
    public class IncidentController {

        @Autowired
        private IncidentService incidentService;

        @GetMapping
        public ResponseEntity<List<Incident>> getAllIncidents(
                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
            try {
                List<Incident> incidents;
                if (date != null) {
                    incidents = incidentService.findByDate(date);
                } else {
                    incidents = incidentService.findAll();
                }
                return ResponseEntity.ok(incidents);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        @GetMapping("/{id}")
        public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
            try {
                Incident incident = incidentService.getIncidentById(id);
                if (incident != null) {
                    return ResponseEntity.ok(incident);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        @PostMapping
        public ResponseEntity<?> createIncident(@RequestBody Incident incident) {
            try {
                if (incident.getTypeIncident() == null || incident.getNatureIncident() == null) {
                    return ResponseEntity.badRequest().body("Type et nature de l'incident sont obligatoires");
                }

                Incident savedIncident = incidentService.saveIncident(incident);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedIncident);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erreur serveur: " + e.getMessage());
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<Incident> updateIncident(
                @PathVariable Long id,
                @RequestBody Incident incidentDetails) {
            try {
                Incident updatedIncident = incidentService.updateIncident(id, incidentDetails);
                if (updatedIncident != null) {
                    return ResponseEntity.ok(updatedIncident);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
            try {
                incidentService.deleteIncident(id);
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        @GetMapping("/search")
        public ResponseEntity<List<Incident>> searchIncidents(
                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateCreation,
                @RequestParam(required = false) String nature) {
            try {
                List<Incident> incidents = incidentService.searchIncidents(dateCreation, nature);
                return ResponseEntity.ok(incidents);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        @GetMapping("/type/{type}")
        public ResponseEntity<List<Incident>> getIncidentsByType(@PathVariable String type,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
            try {
                List<Incident> incidents;
                if (date != null) {
                    incidents = incidentService.findByTypeAndDate(type, date);
                } else {
                    incidents = incidentService.findByType(type);
                }
                return ResponseEntity.ok(incidents);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }
