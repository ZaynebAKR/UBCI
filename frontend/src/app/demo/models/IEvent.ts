export interface IEvent {
  id?: number;
  eventType: EventType;
  scheduledTime: string;
  fictionalTime: string;
  dateCreationEvent?: string;
}
export enum EventType {
  DEBUT_BATCH_ATLAS_II = 'DEBUT_BATCH_ATLAS_II',
  OUVERTURE_TP = 'OUVERTURE_TP',
  OUVERTURE_GIP = 'OUVERTURE_GIP',
  ENVOI_IRREGULIERS = 'ENVOI_IRREGULIERS',
  OUVERTURE_INFOCENTRE = 'OUVERTURE_INFOCENTRE',
  FIN_BATCH_ATLAS_II = 'FIN_BATCH_ATLAS_II'
}

export const EventTypeDisplay = {
  [EventType.DEBUT_BATCH_ATLAS_II]: 'Début Batch Atlas II',
  [EventType.OUVERTURE_TP]: 'Ouverture TP',
  [EventType.OUVERTURE_GIP]: 'Ouverture GIP',
  [EventType.ENVOI_IRREGULIERS]: 'Envoi Irréguliers',
  [EventType.OUVERTURE_INFOCENTRE]: 'Ouverture Infocentre',
  [EventType.FIN_BATCH_ATLAS_II]: 'Fin Batch Atlas II'
};

