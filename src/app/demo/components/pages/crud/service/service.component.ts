import { Component, OnInit, afterNextRender } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Service } from 'src/app/demo/interfaces/service';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { CategorieService } from 'src/app/demo/service/categorie/categorie.service';
import { Categorie } from 'src/app/demo/interfaces/categorie';
import { FormBuilder, NgForm, NgModelGroup, Validators  } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Statut } from 'src/app/demo/interfaces/statut';
import { ServiceSearch } from 'src/app/demo/interfaces/serviceSearch';

@Component({
    templateUrl: './service.component.html',
    providers: [MessageService],
    styleUrl:'./service.component.scss'
})
export class ServiceComponent implements OnInit {
    
    selectedStatut:Statut;

    lesStatuts:Statut[] = [];

    lesServices$: Observable<Service[]>;

    refreshServices$ = new BehaviorSubject<boolean>(true);

    perPage:Number;
    
    page:Number;

    totalData:Number;

    statut: number;

    services: Service[];

    service: Service;

    categories: Categorie[] = [];

    selectedCategorie: Categorie;

    deleteServiceDialog: boolean = false;

    serviceDialog: boolean = false;

    ficheServiceDialog:Boolean = false;


    lesServicesSearch: ServiceSearch = {
        id: '',
        nom:'',
        prixMax: 0,
        prixMin:0,
        comMin:0,
        comMax:0,
        dureeMin:0,
        dureeMax:0,
        statut:0,
        description:'',
        categorie:''
    };

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
        private route: Router,
        private routes: ActivatedRoute
    ) { }

    ngOnInit() {
        this.lesStatuts.push({value:1,intitule:'Actif'},{value:0,intitule:'Inactif'});
        this.listeService(null);
        //this.lesServices$ = this.refreshServices$.pipe(switchMap(_ => this.listeService()));
        this.listeCategorie();
    }
//MANISY DEFAULT VALUE DROPDOWN MBOLA TSY METY

    openNew() {
        
        this.serviceDialog = true;
    }


    editService(service:Service) {
        this.unService = service;
        this.selectedCategorie = service.categorie;
        this.ficheServiceDialog = true;
    }

    deleteService(service) {
        this.deleteServiceDialog = true;
        this.service = service;
        this.refreshServices$.next(true);
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

    
    onPageChange(event: PageEvent,serviceSearch: NgForm) {
        
        console.log(event);
        const queryParams = {
            page: event.page,
            perPage: 2, 
        }
        this.route.navigate([], {
            relativeTo: this.routes,
            queryParams,
            queryParamsHandling: 'merge',
        });
        this.listeService(serviceSearch);
    }

    public listeService(serviceSearch: NgForm): Service[]{

        var queryParams = {};
        if(serviceSearch !== null) {
            queryParams = {
                page: this.routes.snapshot.queryParamMap.get('page') ?? 0,
                perPage: this.routes.snapshot.queryParamMap.get('perPage') ?? 2, 
                nom: serviceSearch ? serviceSearch.value.nom : '',
                prixMax: serviceSearch ? serviceSearch.value.prixMax : '',
                prixMin: serviceSearch ? serviceSearch.value.prixMin : '',
                comMin: serviceSearch ? serviceSearch.value.comMin : '',
                comMax: serviceSearch ? serviceSearch.value.comMax : '',
                dureeMin: serviceSearch ? serviceSearch.value.dureeMin : '',
                dureeMax: serviceSearch ? serviceSearch.value.dureeMax : '',
                statut: serviceSearch ? serviceSearch.value.statut : '',
                description: serviceSearch ? serviceSearch.value.description : '',
                categorie: serviceSearch ? serviceSearch.value.categorie : ''
            };
    
            this.page = Number(this.routes.snapshot.queryParamMap.get('page'));
            this.perPage = Number(this.routes.snapshot.queryParamMap.get('perPage'));
        }
        else if(serviceSearch === null) {
            this.page = 0;
            this.perPage = 2;
        }
        
        this.route.navigate([], {
            relativeTo: this.routes,
            queryParams,
            queryParamsHandling: 'merge',
        });



        this.serviceService.listeServices(serviceSearch ? serviceSearch.value : this.lesServicesSearch,this.page,this.perPage).subscribe(
          
          (response:any) =>{
            
            if(response.status === 200) {

                console.log(response.data.docs);
                //this.lesServices$ = response.data.docs;
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
