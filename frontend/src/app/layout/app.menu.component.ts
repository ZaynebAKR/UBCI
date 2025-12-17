import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

   ngOnInit() {
    this.model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
            ]
        },
        {
            label: 'Incidents',
            icon: 'pi pi-fw pi-exclamation-triangle',
            items: [
                { label: 'Nouvel Incident', icon: 'pi pi-fw pi-plus', routerLink: ['/uikit/new-incident'] },
                { label: 'Liste des Incidents', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/incident-list'] }           ]
        },
        {
            label: 'GAB Hors Service',
            icon: 'pi pi-fw pi-exclamation-triangle',
            items: [
                { label: 'Nouveau GAB_H_S', icon: 'pi pi-fw pi-ban', routerLink: ['/uikit/new-gab'] },
                { label: 'Liste GAB_H_S', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/gab-list'] }
            ]
        },
        {
            label: 'Mise en Production',
            icon: 'pi pi-fw pi-cog',
            items: [
                { label: 'Mise en Prod', icon: 'pi pi-fw pi-check', routerLink: ['/uikit/mise_en_prod'] },
                { label: 'Liste des Mises en Prod', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/mise-en-prod-list'] }
            ]
        },
        {
            label: 'Problèmes',
            icon: 'pi pi-fw pi-exclamation-circle',
            items: [
                { label: 'Problème', icon: 'pi pi-fw pi-question', routerLink: ['/uikit/probleme'] },
                { label: 'Liste des Problèmes', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/probleme-list'] }
            ]
        },
        {
            label: 'GAB',
            icon: 'pi pi-fw pi-credit-card',
            items: [
                { label: 'Ajouter GAB', icon: 'pi pi-fw pi-plus', routerLink: ['/uikit/nbr-gab-add'] },
                { label: 'Liste des GAB', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/nbr-gab-list'] }
            ]
        },
        {
            label: 'Événements',
            icon: 'pi pi-fw pi-calendar',
            items: [
                { label: 'Nouvel Événement', icon: 'pi pi-fw pi-plus', routerLink: ['/uikit/event-table'] },
                { label: 'Liste des Événements', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/event-list'] }
            ]
        }
    ];
}

}
