package tn.esprit.examen.nomPrenomClasseExamen.entities.enums;

public enum EventType {
    DEBUT_BATCH_ATLAS_II("Début Batch Atlas II"),
    OUVERTURE_TP("Ouverture TP"),
    OUVERTURE_GIP("Ouverture GIP"),
    ENVOI_IRREGULIERS("Envoi Irréguliers"),
    OUVERTURE_INFOCENTRE("Ouverture Infocentre"),
    FIN_BATCH_ATLAS_II("Fin Batch Atlas II");

    private final String displayName;

    EventType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}