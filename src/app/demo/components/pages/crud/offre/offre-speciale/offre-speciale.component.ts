import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Categorie } from 'src/app/demo/interfaces/categorie';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { Service } from 'src/app/demo/interfaces/service';
import { ServiceSearch } from 'src/app/demo/interfaces/serviceSearch';
import { Statut } from 'src/app/demo/interfaces/statut';
import { CategorieService } from 'src/app/demo/service/categorie/categorie.service';
import { ServiceService } from 'src/app/demo/service/service/service.service';

@Component({
  selector: 'app-offre-speciale',
  templateUrl: './offre-speciale.component.html',
  styleUrl: './offre-speciale.component.scss'
})
export class OffreSpecialeComponent implements OnInit {
  
  selectedStatut:Statut;

  lesStatuts:Statut[] = [];

  perPage:Number;
  
  page:Number;

  totalData:Number;

  statut: number;

  offres: Service[];

  offre: Service;

  offreAdd: Service={
    nom: '',
    prix: undefined,
    commission: undefined,
    duree: undefined,
    statut: undefined,
    description: '',
    categorie: undefined
  };

  categories: Categorie[] = [];

  selectedCategorie: Categorie;
  
  updateCategorie:Categorie = {
    id: '',
    intitule: ''
  };

  deleteServiceDialog: boolean = false;

  serviceDialog: boolean = false;

  ficheServiceDialog:Boolean = false;
  
  lesServicesSearch: ServiceSearch = {
    id: '',
    nom: '',
    prixMax: undefined,
    prixMin: undefined,
    comMin: undefined,
    comMax: undefined,
    dureeMin: undefined,
    dureeMax: undefined,
    statut: undefined,
    description: '',
    categorie: ''
  };

  unOffre: Service = {
    nom: '',
    prix: 0,
    commission: 0,
    duree: 0,
    statut: false,
    description: '',
    categorie: null
};

nomError = "";
descError = "";
oldPriceError = "";
prixError = "";
dureeError = "";
commissionError = "";
debutError = "";
finError = "";
categError = "";

constructor(
  private messageService: MessageService,
  private serviceService: ServiceService,
  private categorieService: CategorieService,
  private datePipe: DatePipe
) { }

async ngOnInit(): Promise<void> {
  await this.listeCategorie();
  await this.listeOffreSpecial(null,0,10);
}

  openNew() {
    this.lesStatuts.push({value:1,intitule:'Actif'},{value:0,intitule:'Inactif'});
    this.serviceDialog = true;
  }


  editService(offre:Service) {
    this.unOffre = offre;
    this.updateCategorie = offre.categorie;
    //this.updateCategorie.intitule = this.categories.find(cat => cat.id == service.categorie.id).intitule
    this.ficheServiceDialog = true;
  }

  deleteService(offre) {
    this.deleteServiceDialog = true;
    this.offre = offre;
  }

  confirmDelete(offre) {
    this.deleteServiceDialog = false;
    if(offre.statut == true) this.statut = 0
    else this.statut = 1
    this.updateStatutOffreSpecial(offre._id,this.statut);
  }

  onPageChange(event: PageEvent,offreSpecialSearch: NgForm) {
    
    this.listeOffreSpecial(offreSpecialSearch,event.page,10);
  }

  private async listeCategorie(): Promise<Categorie[]> {
    try{
      const response: CustomResponse = await this.categorieService.listeCategorie().toPromise();
      if(response.status == 200 || response.status === 201) {
        this.categories = response.data;
      }
    }catch(error)
    {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
    }
    return this.categories;
}

  public async listeOffreSpecial(offreSpecialSearch: NgForm, pageP:Number,perPageP:Number): Promise<Service[]>{
    try{
      const response: CustomResponse = await this.serviceService.listeOffresSpeciales(offreSpecialSearch ? offreSpecialSearch.value : this.lesServicesSearch,pageP,perPageP).toPromise();
      console.log(response);
      console.log("Liste serv ", offreSpecialSearch)
      if(pageP === undefined || perPageP === undefined){
          pageP = 0; 
          perPageP = 10;
      } 
      if(response.status === 200 ||response.status == 201) {
            
        this.offres = response.data.docs;
        this.totalData = response.data.totalDocs;
        this.perPage = response.data.limit;
      }
    }catch(error) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
    }
    return this.offres;    
  }

  public async addOffreSpecial(ajoutOffreForm:NgForm): Promise<void>{
    try{
      console.log(ajoutOffreForm.value);
      ajoutOffreForm.value.finOffre = this.datePipe.transform(ajoutOffreForm.value.finOffre,'yyyy-MM-dd HH:mm:ss','GMT');
      ajoutOffreForm.value.debutOffre = this.datePipe.transform(ajoutOffreForm.value.debutOffre,'yyyy-MM-dd HH:mm:ss','GMT');
      const response: CustomResponse = await this.serviceService.addOffreSpeciale(ajoutOffreForm ? ajoutOffreForm.value : this.offreAdd).toPromise();
      if(response.status == 200 || response.status == 201) {
        console.log(response);
        this.serviceDialog = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
      }
    }catch(error){
      console.log(error);
      if(error.error.message.nom)
      {
        this.nomError = error.error.message.nom;
      }
      if(error.error.message.description)
      {
        this.descError = error.error.message.description;
      }
      if(error.error.message.oldPrix)
      {
        this.oldPriceError = error.error.message.oldPrix;
      }
      if(error.error.message.prix)
      {
        this.prixError = error.error.message.prix;
      }
      if(error.error.message.duree)
      {
        this.dureeError = error.error.message.duree;
      }
      if(error.error.message.commission)
      {
        this.commissionError = error.error.message.commission;
      }
      if(error.error.message.debutOffre)
      {
        this.debutError = error.error.message.debutOffre;
      }
      if(error.error.message.finOffre)
      {
        this.finError = error.error.message.finOffre;
      }
      if(error.error.message.categorie)
      {
        this.categError = error.error.message.categorie;
      }
      if(error.status == 500){
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    }
  }

  public updateOffreSpecial(offre: Service): void{

    this.unOffre._id = offre._id;
    this.unOffre.nom =  offre.nom;
    this.unOffre.prix =   offre.prix;
    this.unOffre.commission =  offre.commission;
    this.unOffre.duree =  offre.duree;
    this.unOffre.description =  offre.description;

    if(typeof this.updateCategorie === 'object') {
        this.unOffre.categorie = undefined;
    }  
    else if (typeof this.updateCategorie === 'string' ) {
        this.unOffre.categorie = this.updateCategorie;
    }

    this.serviceService.updateService(this.unOffre).subscribe(
        (response:CustomResponse) => {
            this.unOffre.categorie = this.updateCategorie;
            if(response.status == 200) {
                this.ficheServiceDialog = false;
                this.listeOffreSpecial(null,0,10);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            }
        },
        (error:HttpErrorResponse) => {
            this.unOffre.categorie = this.updateCategorie;
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
    )
  }

  private updateStatutOffreSpecial(id:string,statut:number): void{
    this.serviceService.updateStatutService(id,statut).subscribe(
      
        (response:CustomResponse) =>{
          
          if(response.status === 200) {
              this.offre = response.data;
              this.listeOffreSpecial(null,0,10);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
          }
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
}
}
