import { Component, OnInit, afterNextRender } from '@angular/core';
import { Product } from 'src/app/demo/interfaces/product';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Service } from 'src/app/demo/interfaces/service';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { CategorieService } from 'src/app/demo/service/categorie/categorie.service';
import { Categorie } from 'src/app/demo/interfaces/categorie';
import { FormBuilder, Validators  } from '@angular/forms';

@Component({
    templateUrl: './service.component.html',
    providers: [MessageService],
    styleUrl:'./service.component.scss'
})
export class ServiceComponent implements OnInit {


    perPage:Number;

    totalData:Number;

    statut: number;

    services: Service[]= [];

    service: Service;

    categories: Categorie[] = [];

    selectedCategorie: Categorie;

    deleteServiceDialog: boolean = false;

    serviceDialog: boolean = false;

    ficheServiceDialog:Boolean = false;


    unService: Service = {
        id: '',
        nom: '',
        prix: 0,
        commission: 0,
        duree: 0,
        statut: false,
        description: '',
        categorie: null
    };

    serviceForm = this.fb.group({
        nom: ['', [Validators.required]],
        description: ['', [Validators.required]],
        prix: ['', [Validators.required,Validators.min(1)]],
        commission: ['', [Validators.required,Validators.min(1)]],
        duree: ['', [Validators.required,Validators.min(1)]],
        categorie: ['', [Validators.required]]
    })

    get nom() {
        return this.serviceForm.controls['nom'];
    }

    get description() {
        return this.serviceForm.controls['description'];
    }

    get prix() {
        return this.serviceForm.controls['prix'];
    }

    get commission() {
        return this.serviceForm.controls['commission'];
    }

    get duree() {
        return this.serviceForm.controls['duree'];
    }

    get categorie() {
        return this.serviceForm.controls['categorie'];
    }

    constructor(
        private messageService: MessageService,
        private serviceService: ServiceService,
        private categorieService: CategorieService,
        private fb:FormBuilder,
        private route: Router
    ) { }

    ngOnInit() {
        this.listeService(0);
        this.listeCategorie();
    }
//MANISY DEFAULT VALUE DROPDOWN MBOLA TSY METY

    openNew() {
        
        this.serviceForm.reset();
        this.serviceDialog = true;
    }


    editService(service:Service) {
        this.unService = service;
        this.selectedCategorie = service.categorie;
        this.ficheServiceDialog = true;

        this.serviceForm.patchValue({
            nom: service.nom,
            description: service.description,
            prix: String(service.prix),
            duree: String(service.duree),
            commission:String(service.commission),
            categorie: service.categorie.intitule
         });
    }

    deleteService(service) {
        this.deleteServiceDialog = true;
        this.service = service;
    }

    confirmDelete(service) {
        this.deleteServiceDialog = false;
        if(service.statut == true) this.statut = 0
        else this.statut = 1
        this.updateStatutService(service._id,this.statut);
    }

    hideDialog() {
        this.serviceDialog = false;
    }

    onPageChange(event: PageEvent) {
        this.listeService(event.page);
    }

    private listeService(page:Number): Service[]{

        this.serviceService.listeServices(page).subscribe(
          
          (response:any) =>{
            
            if(response.status === 200) {
                this.services = response.data.docs;
                this.totalData = response.data.totalDocs;
                this.perPage = response.data.limit;
            }
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
          }
        )
        return this.services;
    }

    private listeCategorie(): Categorie[] {
        this.categorieService.listeCategorie().subscribe(
          
            (response:any) =>{
              
              if(response.status === 200) {
                  this.categories = response.data;
              }
            },
            (error: HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
          )
        return this.categories;
    }

    private updateStatutService(id:string,statut:number): void{
        this.serviceService.updateStatutService(id,statut).subscribe(
          
            (response:any) =>{
              
              if(response.status === 200) {

                  this.service = response.data;
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
              }
            },
            (error: HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
          )
    }

    public addService(): void{

        const data = this.serviceForm.value;
        
        this.unService.nom =  data.nom;
        this.unService.prix =   Number(data.prix);
        this.unService.commission =  Number(data.commission);
        this.unService.duree =  Number(data.duree);
        this.unService.description =  data.description;
        this.unService.categorie = this.selectedCategorie;

        this.serviceService.addService(this.unService).subscribe(
            (response:any) => {
                if(response.status == 201) {
                    this.serviceForm.reset();
                    this.serviceDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                }
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
        )
    }

    public updateService(service: any): void{

        this.unService.id = service._id;
        this.unService.nom =  service.nom;
        this.unService.prix =   service.prix;
        this.unService.commission =  service.commission;
        this.unService.duree =  service.duree;
        this.unService.description =  service.description;
        this.unService.categorie = this.selectedCategorie;

        this.serviceService.updateService(this.unService).subscribe(
            (response:any) => {
                if(response.status == 200) {
                    this.ficheServiceDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                }
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
        )
    }

    
}
