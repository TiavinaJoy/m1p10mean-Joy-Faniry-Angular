import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private route:Router
    ) { }

    deconnexion() {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('employe');
        localStorage.removeItem('dateRendezVous');
        localStorage.removeItem('service');
        localStorage.removeItem('nomEmploye');
        localStorage.removeItem('serviceId');
        this.route.navigate(['/']);
    }
}
