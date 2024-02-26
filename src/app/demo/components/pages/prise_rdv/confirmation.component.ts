import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Facture } from 'src/app/demo/interfaces/facture';
import { RendezVous } from 'src/app/demo/interfaces/rendezVous';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';
import { TokenService } from 'src/app/demo/service/token/token.service';

@Component({
  templateUrl: './confirmation.component.html',
  providers:[MessageService]
})
export class ConfirmationComponent implements OnInit{

  facture: Facture;
  clientId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
  rdv:RendezVous = {
    client: '',
    dateRendezVous: '',
    dateFin: '',
    personnel: '',
    service: '',
    statut: ''
  };
  service:string;
  personnel:string;
  dateRdv: string;
  rdvId:string;
  isConfirmed:boolean = true;
  submitted: Boolean = false;
  modalConfirmerRdv: boolean=false;

  constructor(
    private router: Router,
    private rdvService: RendezVousService,
    private messageService:MessageService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.service= localStorage.getItem('service');
    this.personnel= localStorage.getItem('nomEmploye');
    this.dateRdv= localStorage.getItem('dateRendezVous');
    this.rdvId = this.router.url.split('/')[3];
  }

  hideDialog() {
    this.modalConfirmerRdv = false;
  }

  confirmationInfo() {
    this.modalConfirmerRdv = true;
  }


  public addRdv(): void{
    this.modalConfirmerRdv = false;

    this.rdv.client = this.clientId;
    this.rdv.dateRendezVous = localStorage.getItem("dateRendezVous");
    this.rdv.personnel = localStorage.getItem("employe");
    this.rdv.service = localStorage.getItem("serviceId");

    this.rdvService.addRdv(this.rdv).subscribe(
      (response:CustomResponse) => {

        localStorage.setItem("factureId",response.data.facture._id);
        localStorage.setItem("prix",response.data.facture.prix);
        localStorage.setItem("clientId",response.data.facture.client._id);
        localStorage.setItem('employe',response.data.facture.rendezVous.personnel._id);
        localStorage.setItem('dateRendezVous',response.data.facture.rendezVous.dateRendezVous);
        localStorage.setItem('serviceId',response.data.facture.rendezVous.service._id);
      
        this.facture = response.data;
        this.isConfirmed = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
      },(error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
  }
  nextPage() {    
    this.rdvService.setData(this.facture);
    this.router.navigate(['pages/rdv/'+this.rdvId+'/payment']);
    this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['pages/rdv/'+this.rdvId+'/calendar']);
  }
}
