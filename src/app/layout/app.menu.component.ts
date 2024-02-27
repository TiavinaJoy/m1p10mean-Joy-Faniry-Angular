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
                    //{ label: 'Prise de rendez-vous du client', icon: 'pi pi-fw pi-calendar', routerLink: ['rdv'],  role: 'client' },
                    { label: 'Historique des rendez-vous', icon: 'pi pi-fw pi-history', routerLink: ['rendezVous/client'], role: 'client' },
                ]
            },
            {
                label: 'Employé',
                role: 'employe',
                items: [
                    {
                        label: 'Profil',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['profil'],
                        role: 'employe'
                    },
                    { label: 'Mes commissions', icon: 'pi pi-fw pi-money-bill', routerLink: ['commission'], role: 'employe' },
                    { label: 'Mes horaires', icon: 'pi pi-fw pi-clock', routerLink: ['horaire'], role: 'employe' },
                    { label: 'Mes rendez-vous', icon: 'pi pi-fw pi-calendar', routerLink: ['employe/rdv'], role: 'employe' },                    
                ]
            }, 
            {
                label: 'Manager',
                role: 'manager',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard'], role: 'manager' },
                    {
                        label: 'Services',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['services'],
                        role: 'manager'
                    },
                    {
                        label: 'Employés',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['employes'],
                        role: 'manager'
                    },
                    {
                        label: 'Dépenses',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['depense'],
                        role: 'manager'
                    },
                ]
            },
        ];
    }
}
