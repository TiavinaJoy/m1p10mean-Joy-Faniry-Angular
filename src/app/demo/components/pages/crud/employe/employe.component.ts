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

@Component({
    templateUrl: './employe.component.html',
    providers: [MessageService]
})
export class EmployeComponent implements OnInit {
    /*MES VARIABLES */
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
    servicesGo:Service[];
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
    
    
    /* */

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    
    constructor(
        private serviceService: ServiceService, 
        private messageService: MessageService,
        private utilisateurService:UtilisateurService
    ) { }

    ngOnInit() {
        this.lesServices();
        this.lesRoles();
    } 

    openNew() {
        this.product = {};
        this.newEmploye = true;
        this.submitted = false;
    }


    editProduct(product: Product) {
        this.product = { ...product };
        this.newEmploye = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.newEmploye = false;
    }

    private lesServices(): Service[] {

        this.serviceService.tousLesServices().subscribe(
            (response:any) => {
                this.services = response.data;
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
        );
        return this.services;
    }

    private lesRoles(): Role[] {

        this.utilisateurService.listeRole().subscribe(
            (response:any) => {
                this.roles = response.data;
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
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


        this.utilisateurService.addEmploye(this.employe).subscribe( 
            (response:any) => {
                if(response.status === 201) {
                    addEmploye.reset();
                    this.newEmploye = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                }
            },
            (error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
        )
    }
}
