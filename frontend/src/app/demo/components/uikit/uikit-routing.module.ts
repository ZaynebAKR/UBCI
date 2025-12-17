import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { EventTableComponent } from './event-table/event-table.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { GabAddComponent } from './gab-add/gab-add.component';
import { GabListComponent } from './gab-list/gab-list.component';
import { MiseEnProdComponent } from './mise-en-prod/mise-en-prod.component';
import { MiseEnProdListComponent } from './mise-en-prod-list/mise-en-prod-list.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ProblemeListComponent } from './probleme-list/probleme-list.component';
import { NbrGabListComponent } from './nbr-gab-list/nbr-gab-list.component';
import { NbrGabAddComponent } from './nbr-gab-add/nbr-gab-add.component';

@NgModule({
    imports: [RouterModule.forChild([
    { path: 'new-incident', component: NewIncidentComponent },
    { path: 'event-table', component: EventTableComponent },
    { path: 'incident-list', component: IncidentListComponent },
    { path: 'event-list', component: EventListComponent },   
    { path: 'new-gab', component: GabAddComponent },
    { path: 'gab-list', component: GabListComponent },
    { path: 'mise_en_prod', component: MiseEnProdComponent },
    { path: 'mise-en-prod-list', component: MiseEnProdListComponent },
    { path: 'probleme', component: ProblemeComponent },
    { path: 'probleme-list', component: ProblemeListComponent },
    { path: 'nbr-gab-list', component: NbrGabListComponent },
    { path: 'nbr-gab-add', component: NbrGabAddComponent },



 ])],
    exports: [RouterModule]
})
export class UikitRoutingModule { }
