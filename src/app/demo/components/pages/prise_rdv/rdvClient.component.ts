import { Component, OnInit } from '@angular/core';
import {  MenuItem } from 'primeng/api';

@Component({
    templateUrl: './rdvClient.component.html',
    styles: [`
        :host ::ng-deep .p-menubar-root-list {
            flex-wrap: wrap;
        }
    `]
})
export class RdvClientComponent implements OnInit {

    routeItems: MenuItem[] = [];
    
    ngOnInit() {
       
        this.routeItems = [
            { label: 'Employé', routerLink: 'personal' },
            { label: 'Calendrier ', routerLink: 'calendar' },
            { label: 'Confirmation', routerLink: 'confirmation' },
            { label: 'Paiement', routerLink: 'payment' },
        ];

    }

}
