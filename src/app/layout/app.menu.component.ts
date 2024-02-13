import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    isManager: Boolean = false;
    isClient: Boolean = false;
    isEmploye:Boolean = false;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Client',
                items: [
                    { label: 'Liste des services', icon: 'pi pi-fw pi-list', routerLink: ['vitrine'] },
                    { label: 'Prise de rendez-vous du client', icon: 'pi pi-fw pi-calendar', routerLink: ['rdv'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Historique des rendez-vous', icon: 'pi pi-fw pi-calendar', routerLink: ['rdv/client'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                ]
            },
            {
                label: 'Employé',
                items: [
                    { label: 'Gestion des horaires de l\'employé', icon: 'pi pi-fw pi-calendar', routerLink: ['horaire'] },
                    { label: 'Les rendez-vous de l\'employé', icon: 'pi pi-fw pi-stopwatch', routerLink: ['rdv/emp'] },
                    {
                        label: 'Gestion des profils',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['profil']
                    },
                ]
            }, 
            {
                label: 'Manager',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard'] },
                    {
                        label: 'Gestion des services',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['services']
                    },
                    {
                        label: 'Gestion des employés',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['employes']
                    },
                ]
            },
        ];
    }
}
