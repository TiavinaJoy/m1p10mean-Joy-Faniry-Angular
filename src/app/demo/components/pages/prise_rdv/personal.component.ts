import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { CountryService } from 'src/app/demo/service/country.service';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
	templateUrl: './personal.component.html',
    providers:[MessageService]
})


export class PersonalComponent implements OnInit {
    
    rdvId: string;
    employes: SelectItem[] = [];
    selectedEmploye: Utilisateur;
    submitted: Boolean = false;

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilisateurService: UtilisateurService,
        private messageService: MessageService
    ) { }	

	ngOnInit() {
        
        this.rdvId = this.router.url.split('/')[3];
        this.listeEmploye();
    }

    nextPage() {
        /*if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
            this.ticketService.ticketInformation.personalInformation = this.personalInformation;
           this.router.navigate(['pages/rdv/calendar']);

            return;
        }*/
        console.log(this.selectedEmploye)
        localStorage.setItem('employe',this.selectedEmploye._id);
        localStorage.setItem('nomEmploye',this.selectedEmploye.nom);
        localStorage.setItem('service','service');
        localStorage.setItem('serviceId',this.rdvId);
        this.router.navigate(['pages/rdv/'+this.rdvId+'/calendar']);
        this.submitted = true;
    }

    private listeEmploye(): void {

        this.utilisateurService.listeEmploye().subscribe(
            (response:CustomResponse) => {
                const data =  response.data;
                data.forEach(emp => {
                    this.employes.push({ label: emp.nom, value: { _id: emp._id, nom: emp.nom, code: emp.nom }})
                })
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
    }
}
