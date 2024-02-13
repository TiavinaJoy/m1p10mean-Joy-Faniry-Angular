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
                label: 'Client',
                role: 'client',
                items: [
                    { label: 'Liste des services', icon: 'pi pi-fw pi-list', routerLink: ['vitrine'], role: 'client' },
                    { label: 'Prise de rendez-vous du client', icon: 'pi pi-fw pi-calendar', routerLink: ['rdv'],  role: 'client' },
                    { label: 'Historique des rendez-vous', icon: 'pi pi-fw pi-history', routerLink: ['rdv/client'], role: 'client' },
                ]
            },
            {
                label: 'Employé',
                role: 'employe',
                items: [
                    { label: 'Gestion des horaires de l\'employé', icon: 'pi pi-fw pi-clock', routerLink: ['horaire'], role: 'employe' },
                    { label: 'Les rendez-vous de l\'employé', icon: 'pi pi-fw pi-calendar', routerLink: ['rdv/emp'], role: 'employe' },
                    {
                        label: 'Gestion des profils',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['profil'],
                        role: 'employe'
                    },
                ]
            }, 
            {
                label: 'Manager',
                role: 'manager',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard'], role: 'manager' },
                    {
                        label: 'Gestion des services',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['services'],
                        role: 'manager'
                    },
                    {
                        label: 'Gestion des employés',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['employes'],
                        role: 'manager'
                    },
                ]
            },
        ];
    }
}
