import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { NewIncidentComponent } from './demo/components/uikit/new-incident/new-incident.component';
import { EventTableComponent } from './demo/components/uikit/event-table/event-table.component';
import { IncidentListComponent } from './demo/components/uikit/incident-list/incident-list.component';
import { EventListComponent } from './demo/components/uikit/event-list/event-list.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { GabAddComponent } from './demo/components/uikit/gab-add/gab-add.component';
import { GabListComponent } from './demo/components/uikit/gab-list/gab-list.component';
import { CalendarModule } from 'primeng/calendar';
import { MiseEnProdComponent } from './demo/components/uikit/mise-en-prod/mise-en-prod.component';
import { MiseEnProdListComponent } from './demo/components/uikit/mise-en-prod-list/mise-en-prod-list.component';
import { ProblemeComponent } from './demo/components/uikit/probleme/probleme.component';
import { ProblemeListComponent } from './demo/components/uikit/probleme-list/probleme-list.component';
import { NbrGabListComponent } from './demo/components/uikit/nbr-gab-list/nbr-gab-list.component';
import { NbrGabAddComponent } from './demo/components/uikit/nbr-gab-add/nbr-gab-add.component';

@NgModule({
    declarations: [
        AppComponent,
         NotfoundComponent,
         NewIncidentComponent,
         EventListComponent,
         EventTableComponent,
         IncidentListComponent,
         GabAddComponent,
         GabListComponent,
         GabAddComponent,
         MiseEnProdComponent,
         MiseEnProdListComponent,
         ProblemeComponent,
         ProblemeListComponent,
         NbrGabListComponent,
         NbrGabAddComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule, 
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CardModule,
        PanelMenuModule,
        CalendarModule,


    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
