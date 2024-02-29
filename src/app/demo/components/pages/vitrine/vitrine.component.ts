import { Component, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/demo/service/preference/preference.service';
import { Service } from 'src/app/demo/interfaces/service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Preference } from 'src/app/demo/interfaces/preference';
import { NgForm } from '@angular/forms';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { ServiceSearch } from 'src/app/demo/interfaces/serviceSearch';
import { Statut } from 'src/app/demo/interfaces/statut';
import { Categorie } from 'src/app/demo/interfaces/categorie';
import { CategorieService } from 'src/app/demo/service/categorie/categorie.service';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { PreferenceSpec } from 'src/app/demo/interfaces/preferenceSpec';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { TokenService } from 'src/app/demo/service/token/token.service';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './vitrine.component.html',
    providers: [MessageService]
})
export class VitrineComponent implements OnInit {
    idClient: string = this.tokenService.decodeToken(localStorage.getItem('token')).sub;

    offres:Service[];

    employes:Utilisateur[];

    employeSelected: Utilisateur;

    categories: Categorie[] = [];

    selectedCategorie: Categorie;
    
    lesStatuts:Statut[] = [];
    
    selectedStatut:Statut;
    
    preferences:Preference[];

    oneFav: any;

    services:Service[];

    perPage:Number;
    
    page:Number;

    totalData:Number;

    serviceFav: any;

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
    
    preferenceAdd: PreferenceSpec ={
        id: '',
        client: '',
        personnel: [],
        service: '',
        statut: true
    }
    
    favorisDialog:Boolean = false;

    favorisUpdateDialog: Boolean = false;

    updateStatutFavDialog:Boolean = false;

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private messageService:MessageService,
        private preferenceService:PreferenceService,
        private serviceService:ServiceService,
        private categorieService: CategorieService,
        private utilisateurService:UtilisateurService,
        private tokenService: TokenService,
        private datePipe: DatePipe,
        private route:Router,
        private routes:ActivatedRoute
    ) { }

    async ngOnInit() {
        this.lesStatuts.push({value:1,intitule:'Actif'},{value:0,intitule:'Inactif'});
        this.listeFavoris();
        await this.listeCategorie();
        await this.listeEmploye();
        await this.listeOffresSpeciales();
        this.listeService(null,0,10);
    }

    public toDisplay(offre:Service){
        var today = new Date();
        today.setHours(0,0,0);
        const dateString = this.datePipe.transform(offre.finOffre,'yyyy-MM-dd','GMT')
        const finOffre = this.datePipe.transform(offre.finOffre,'yyyy-MM-dd','GMT')

        if(new Date(finOffre) >= new Date(dateString) ) return true
        else  return false
        
    }
    prendreRdv(serv: Service) {
        localStorage.setItem("service",serv.nom);
        this.route.navigate(['pages/rdv',serv._id]);
    }

    onPageChange(event: PageEvent,serviceSearch: NgForm) {
        
        this.listeService(serviceSearch,event.page,10);
    }
    
    addFavoris(service: Service) {
        this.serviceFav = service;
        this.favorisDialog = true;
    }

    updateFavoris(serviceFav:Preference){
        this.oneFav = serviceFav;
        this.favorisUpdateDialog = true;
    }

    deleteFavoris(service:Preference){
        this.oneFav = service;
        this.updateStatutFavDialog = true;
    }

    public updateStatutFavoris(service: Preference): void {
        var statut = 0;

        if(service.statut == true) statut = 0
        else statut = 1

        this.preferenceService.updateStatutFavoris(this.oneFav._id,statut).subscribe(
            (response:CustomResponse) => {
                this.listeFavoris();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                this.updateStatutFavDialog = false;

            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );

    }

    public modifierFavori(updateFavorisForm: NgForm) : void{

        var personnel = {
            personnel: updateFavorisForm ? updateFavorisForm.value.employe : []
        }
        
        this.preferenceService.updateFavoris(this.oneFav._id,personnel).subscribe(
            (response:CustomResponse) => {
                updateFavorisForm.reset();
                this.favorisUpdateDialog = false;
                this.listeFavoris();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
        
    }

    public ajoutFavoris(favorisForm: NgForm): void {

        this.preferenceAdd.client = this.idClient;
        this.preferenceAdd.personnel = favorisForm ? favorisForm.value.employe : [];
        this.preferenceAdd.service = this.serviceFav._id;
        

        this.preferenceService.ajoutFavoris(this.preferenceAdd).subscribe(
            (response:CustomResponse) => {
                favorisForm.reset();
                this.listeFavoris();
                this.favorisDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
        
    }

    public listeService(serviceSearch: NgForm, pageP:Number,perPageP:Number): Service[]{

        var queryParams = {};
        if(serviceSearch !== null) {
            if(pageP === undefined){
                pageP = 0; 
            } 
            queryParams = {
                page: pageP,
                perPage: perPageP, 
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
        }
        
        this.route.navigate([], {
            relativeTo: this.routes,
            queryParams,
            queryParamsHandling: 'merge',
        });

        this.serviceService.listeServices(serviceSearch ? serviceSearch.value : this.lesServicesSearch,pageP,perPageP).subscribe(
          
          (response:any) =>{
            
            if(response.status === 200) {
                this.services = response.data.docs;
                this.totalData = response.data.totalDocs;
                this.perPage = response.data.limit;
            }
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
          }
        )
        return this.services;
    }

    private async listeFavoris(): Promise<Preference[]> {
        try {
            console.log(this.idClient);
            
            const response: CustomResponse = await this.preferenceService.listeFavoris(this.idClient).toPromise();
            if(response.status == 200 || response.status == 201){
                this.preferences = response.data;
            }

        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
        return this.preferences;
    }
   /* private listeFavoris(): Preference[]{
        console.log(this.idClient);
        this.preferenceService.listeFavoris(this.idClient).subscribe(
            (response:CustomResponse) => {
                this.preferences = response.data;
            },
            (error:HttpErrorResponse) => {

                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });

            }
        );
        return this.preferences;
    }*/

    private  listeEmploye(): Utilisateur[] {

        this.utilisateurService.listeEmploye().subscribe(
             (response:CustomResponse) => {
                this.employes =  response.data;
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
        return this.employes;
    }

    private listeCategorie(): Categorie[] {
        this.categorieService.listeCategorie().subscribe(
          
            (response:CustomResponse) =>{
              
              if(response.status === 200) {
                  this.categories = response.data;
              }
            },
            (error: HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
          )
        return this.categories;
    }
    
    public async listeOffresSpeciales(): Promise<Service[]> {
        const data = (await this.serviceService.allOffresSpeciales(null,0,10).toPromise()).data;
        console.log(data);
        const totalData = data.totalDocs;
        this.offres = (await this.serviceService.allOffresSpeciales(null,0,3).toPromise()).data.docs;
        return this.offres;
    }
}
