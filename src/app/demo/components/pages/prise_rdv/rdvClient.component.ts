import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    constructor(
        private route:ActivatedRoute
    ) {}
    routeItems: MenuItem[] = [];
    
    ngOnInit() {
       
        console.log(this.route.snapshot.params['servId']);
        this.routeItems = [
            { label: 'Employé', routerrLink: 'personal' },
            { label: 'Calendrier ', routerLink: 'calendar' },
            { label: 'Confirmation', routerLink: 'confirmation' },
            { label: 'Paiement', routerLink: 'payment' },
        ];
        /*this.routeItems = [
            { label: 'Employé', routerLink: ['personal',{ servId: this.route.snapshot.params['servId']} ] },
            { label: 'Calendrier ', routerLink: ['calendar',{ servId: this.route.snapshot.params['servId']} ] },
            { label: 'Confirmation', routerLink: ['confirmation',{ servId: this.route.snapshot.params['servId']} ] },
            { label: 'Paiement', routerLink: ['payment',{ servId: this.route.snapshot.params['servId']} ] },
        ];*/

    }

}
