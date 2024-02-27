import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { map } from 'rxjs';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
	templateUrl: './personal.component.html',
    providers:[MessageService]
})


export class PersonalComponent implements OnInit {
    
    emp:Utilisateur;
    empNom:string;
    rdvId: string;
    //employes: SelectItem[] = [];
    employes:Utilisateur[];
    selectedEmploye: string;
    submitted: Boolean = false;

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilisateurService: UtilisateurService,
        private messageService: MessageService,
    ) { }	

	ngOnInit() {
        
        this.rdvId = this.router.url.split('/')[3];
        this.listeEmploye();
    }

    private getOneEmp(empId: string): Utilisateur{

        this.utilisateurService.getOnePers(empId).subscribe(
            (response:any) => {
                this.emp = response.data;
                console.log(this.emp);
                /*localStorage.setItem("employe",this.emp._id)*/
                localStorage.setItem('nomEmploye',this.emp.nom);
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({severity:'error', summary:'Error', detail:error.error.message, life: 3000});
            }
        );
        return this.emp;
    }

    nextPage() {
        console.log(this.selectedEmploye)
        if(!this.selectedEmploye) this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Vous devez sélectionner un employé', life: 3000 });
        else {
            this.getOneEmp(this.selectedEmploye);
            localStorage.setItem("employe",this.selectedEmploye);
            localStorage.setItem('serviceId',this.rdvId);
            this.router.navigate(['pages/rdv/'+this.rdvId+'/calendar']);
            this.submitted = true;
        }
    }

    private listeEmploye(): void {

        this.utilisateurService.listeEmploye().subscribe(
            (response:CustomResponse) => {
                const data =  response.data;
                this.employes = data;
                /*data.forEach(emp => {
                    this.employes.push({ label: emp.nom, value: { _id: emp._id, nom: emp.nom, code: emp.nom }})
                })*/
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
    }

}
