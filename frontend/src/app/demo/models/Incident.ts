export interface Incident {
  id: number;
  user_id: number;
  impact: string;
  criticite: string;
  dateIncident: string;
  dateDuJour: string;
  typeIncident: string;
  natureIncident: string;
  dateCreationIncident?: string;   
}
