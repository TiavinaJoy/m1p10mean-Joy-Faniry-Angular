import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/interfaces/product';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Role } from 'src/app/demo/interfaces/role';
import { InfoEmploye } from 'src/app/demo/interfaces/infoEmploye';
import { Service } from 'src/app/demo/interfaces/service';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { EmployeSpec } from 'src/app/demo/interfaces/employeSpec';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { UtilisateurSpec } from 'src/app/demo/interfaces/utilisateurSpec';
import { Statut } from 'src/app/demo/interfaces/statut';

@Component({
    templateUrl: './employe.component.html',
    providers: [MessageService]
})
export class EmployeComponent implements OnInit {
    /*MES VARIABLES */
    statut: number;
    employeUpdate:Utilisateur;
    employeDelete:Utilisateur;
    lesStatuts:Statut[] = [];
    selectedStatut: Statut;
    totalData: Number;
    perPage:Number;
    page:Number;
    lesEmpSearch: Utilisateur[];
    newEmploye: boolean = false;
    submitted: boolean = false;
    serviceSelected: Service;
    services:Service[];
    addService:Service = {
        id: '',
        nom: '',
        prix: 0,
        commission: 0,
        duree: 0,
        statut: false,
        description: '',
        categorie: null
    };
    roles:Role[];
    roleSelected: Role;
    role: Role = {
        id: '',
        intitule: ''
    };
    infoEmploye:InfoEmploye = {
        dateEmbauche: undefined,
        finContrat: undefined,
        salaire: 0,
        service: []
    };
    employe: EmployeSpec = {
        id: '',
        mail:'',
        mdp:'',
        nom:'',
        prenom:'',
        statut: false,
        role: '',
        dateEmbauche: new Date(),
        finContrat: new Date(),
        salaire: 0,
        service: []
    };
    empSearch: UtilisateurSpec={
        nom: '',
        prenom: '',
        mail: '',
        statut: '',
        role: '',
        salaireMin: '',
        salaireMax: '',
        dateEmbaucheMin: '',
        dateEmbaucheMax: '',
        finContratMax: '',
        finContratMin: '',
        service: ''
    }
    

    deleteEmployeDialog: boolean = false;

    updateEmployeDialog: boolean = false;


    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    /*Error variable */
    nomError:string;
    prenomError:string;
    mailError:string;
    roleError:string;
    serviceError:string;
    salaireError:string;
    dateEmbaucheError:string;
    finContratError:string;
    errorMessage:string;

    constructor(
        private serviceService: ServiceService, 
        private messageService: MessageService,
        private route: Router,
        private routes: ActivatedRoute,
        private utilisateurService:UtilisateurService
    ) { }

    ngOnInit() {
        this.lesStatuts.push({value:1,intitule:'Actif'},{value:0,intitule:'Inactif'});
        this.lesServices();
        this.lesRoles();
        this.listePersonnel(null,0,10);
    } 

    openNew() {
        this.newEmploye = true;
        this.submitted = false;

        this.nomError= '';
        this.prenomError= '';
        this.mailError= '';
        this.roleError= '';
        this.serviceError= '';
        this.salaireError= '';
        this.dateEmbaucheError= '';
        this.finContratError= '';
    }

    hideDialog() {
        this.newEmploye = false;
    }

    deleteEmploye(employe: Utilisateur) {
        this.deleteEmployeDialog = true;
        this.employeDelete = employe;
    }
    
    updateEmp(employe: Utilisateur) {
        this.updateEmployeDialog = true;
        this.employe.salaire = employe.infoEmploye.salaire;
    }

    public desactivation(employe:any): void{

        if(employe.statut == true) this.statut = 0
        else this.statut = 1

        this.utilisateurService.updateStatutEmploye('65d5b33e22c9b6c6965bce2e',this.statut).subscribe(
            (response:CustomResponse) => {

                this.deleteEmployeDialog = false;                
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
    }

    private lesServices(): Service[] {

        this.serviceService.tousLesServices().subscribe(
            (response:any) => {
                this.services = response.data;
            },
            (error:HttpErrorResponse) => {
                if(error.status !== 500) {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
                }
            }
        );
        return this.services;
    }

    private lesRoles(): Role[] {

        this.utilisateurService.listeRole().subscribe(
            (response:CustomResponse) => {
                this.roles = response.data;
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
        return this.roles;
    }

    public ajoutEmploye(addEmploye:NgForm): void{

        this.submitted = true;
    
        this.employe.nom = addEmploye ? addEmploye.value.nom : '';
        this.employe.prenom = addEmploye ? addEmploye.value.prenom : '';
        this.employe.mail = addEmploye ? addEmploye.value.mail : '';
        this.employe.dateEmbauche = addEmploye ? addEmploye.value.dateEmbauche : '';
        this.employe.role = addEmploye ? addEmploye.value.role : '';
        this.employe.salaire = addEmploye ? addEmploye.value.salaire : 0;
        this.employe.service = addEmploye ? addEmploye.value.service : [];                                            
        this.employe.finContrat =     addEmploye ? addEmploye.value.finContrat : ''; 

        if(addEmploye.value.service == undefined) {
            this.employe.service = []
        }

        this.utilisateurService.addEmploye(this.employe).subscribe( 
            (response:CustomResponse) => {
                if(response.status === 201) {
                    addEmploye.reset();
                    this.newEmploye = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                }
            },
            (error: HttpErrorResponse) => {
                console.log(error);
                if(error.status != 400) {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
                }
                if(error.status == 400) {
                    if(error.error.message.nom) {
                        this.nomError = error.error.message.nom ;
                    }
                    if(error.error.message.prenom) {
                        this.prenomError = error.error.message.prenom ;
                    }
                    if(error.error.message.mail) {
                        this.mailError = error.error.message.mail ;
                    }
                    if(error.error.message.role) {
                        this.roleError = error.error.message.role ;
                    }
                    if(error.error.message.finContrat) {
                        this.finContratError = error.error.message.finContrat ;
                    }
                }
            }
        )
    }

    public listePersonnel(employeSearch: NgForm, pageP:Number,perPageP:Number): Utilisateur[]{

        var queryParams = {};
        if(!this.utilisateurService.checkVide(employeSearch)) {

            console.log("Non vide mais dans le lien et component")
            if(pageP === undefined){
                pageP = 0; 
            } 

            queryParams = {
                page: pageP,
                perPage: perPageP, 
                nom: employeSearch ? employeSearch.value.nom : '',
                prenom: employeSearch ? employeSearch.value.prenom : '',
                mail: employeSearch ? employeSearch.value.mail : '',
                statut: employeSearch ? employeSearch.value.statut : '',
                role: employeSearch ? employeSearch.value.role : '',
                salaireMin: employeSearch ? employeSearch.value.salaireMin : '',
                salaireMax: employeSearch ? employeSearch.value.salaireMax : '',
                dateEmbaucheMin: employeSearch ? employeSearch.value.dateEmbaucheMin : '',
                dateEmbaucheMax: employeSearch ? employeSearch.value.dateEmbaucheMax : '',
                finContratMax: employeSearch ? employeSearch.value.finContratMax : '',
                finContratMin: employeSearch ? employeSearch.value.finContratMin : '',
                service: employeSearch ? employeSearch.value.service : ''
            };
        }
        
        this.route.navigate([], {
            relativeTo: this.routes,
            queryParams,
            queryParamsHandling: 'merge',
        });

        this.utilisateurService.listePersonnel(employeSearch ? employeSearch.value : this.empSearch,pageP,perPageP).subscribe(
          
          (response:any) =>{
            
            if(response.status === 200) {

                console.log(response.data.docs);
                this.lesEmpSearch = response.data.docs;
                this.totalData = response.data.totalDocs;
                this.perPage = response.data.limit;
            }
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
          }
        )
        return this.lesEmpSearch;
    }

    public modificationEmploye(empUpdate: NgForm): void {
        var serv = [];
        if( empUpdate && empUpdate.value.service != undefined) serv =  empUpdate.value.service;

        var infoEmp = {
            salaire: empUpdate ? empUpdate.value.salaire : 0,
            service: serv,
            role: empUpdate ? empUpdate.value.role : '',
            finContrat: empUpdate ? empUpdate.value.finContrat : ''
        };

        this.utilisateurService.updateInfoEmploye(infoEmp,'65d5b33e22c9b6c6965bce2e').subscribe(
            (response:CustomResponse) => {
                if(response.status == 200) {

                    empUpdate.reset();
                    this.updateEmployeDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                }
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )

    }

}
