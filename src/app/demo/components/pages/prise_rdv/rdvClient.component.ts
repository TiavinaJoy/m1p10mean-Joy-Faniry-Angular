import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private router:Router,
        private route: ActivatedRoute
    ) {}
    routeItems: MenuItem[] = [];
    
    ngOnInit() {
       console.log(this.router.url)
       var id = this.router.url.split('/')[3];
       console.log(id)
        this.routeItems = [
            { label: 'Employé', routerLink: 'personal' },
            { label: 'Calendrier', routerLink: 'calendar' },
            { label: 'Confirmation', routerLink: 'confirmation' },
            { label: 'Paiement', routerLink: 'payment' },
        ];

    }

}
