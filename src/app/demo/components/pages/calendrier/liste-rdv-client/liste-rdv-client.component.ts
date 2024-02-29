import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { RendezVous } from 'src/app/demo/interfaces/rendezVous';
import { MessageService } from 'primeng/api';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { TokenService } from 'src/app/demo/service/token/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { RendezVousSpec } from 'src/app/demo/interfaces/rendezVousSpec';
import { DatePipe } from '@angular/common';
import { StatutRendezVous } from 'src/app/demo/interfaces/statutRendezVous';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
  selector: 'app-liste-rdv-client',
  templateUrl: './liste-rdv-client.component.html',
  providers:[MessageService,DatePipe]
})
export class ListeRdvClientComponent implements OnInit{
  employes: Utilisateur[];
  emp: Utilisateur;
  statutRdvAnnulerId: string;
  dataUpdate: RendezVous;
  lesStatutsRdv: StatutRendezVous[];
  dateRdv: Date;
  fiche:RendezVous = {
    client: '',
    dateRendezVous: '',
    dateFin: '',
    personnel: '',
    service: '',
    statut: ''
  };
  filtreRdvClient: RendezVousSpec={
    client: '',
    personnal: '',
    service: '',
    statut: '',
    dateRendezVousMin: '',
    dateRendezVousMax: ''
  }
  page:Number;
  perPage:Number;
  totalData:Number;
  clientId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
  lesRdv: RendezVous[];
  selectedCountry!: any;
  countries!: any;
  afficherAjoutModal: boolean = false;
  afficherFicheModal: boolean = false;
  submitted: boolean = false; 
  dateDebut: Date;
  dateFin: Date;
  rdv: any;

  calendarOptions: CalendarOptions = {
      initialView: 'timeGridWeek', 
      plugins: [dayGridPlugin,timeGridPlugin,listPlugin,interaction ],
      locale: 'fr',
      headerToolbar:{
          center:'title',
          left:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      editable:true,
      nowIndicator:true,
      buttonText: {
        today: "Aujourd'hui",
        day: 'Jour',
        week:'Semaine',
        month:'Mois',
        list:'Liste'
    },
    eventClick: this.modalFicheJourLibre.bind(this),
    handleWindowResize: true
  }
    
  constructor(
    private messageService:MessageService,
    private rdvService: RendezVousService,
    private tokenService: TokenService,
    private utilisateurService: UtilisateurService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.listeRdvClient(null,0, 10);
    this.statutRdvAnnuler();
    this.listeEmploye();
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
  }

  /*Ouverture du formulaire des fiches jours libres */
  modalFicheJourLibre(arg) {
    this.ficheRdv(arg.event.id);
    this.afficherFicheModal = true;
  }
  
  onPageChange(event: PageEvent,filtreRdvClient: NgForm) {
        console.log(event.page)
    this.listeRdvClient(filtreRdvClient,event.page,10);
}

  public listeRdvClient(filtreRdvClient: NgForm,pageP:Number, perPageP: Number): RendezVous[] {

    if(pageP === undefined || perPageP === undefined){
      pageP = 0; 
      perPageP = 10;
    } 

    this.rdvService.listeRdvClient(filtreRdvClient ? filtreRdvClient.value : this.filtreRdvClient,pageP,perPageP,this.clientId).subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {

          var data = response.data.docs;
          var rdv = [];
          console.log(data)
          data.forEach(daty => {
            //rdv.push({ start: daty.dateRendezVous, end: daty.dateFin, id:daty._id }) 
            rdv.push({ 
              start:  this.datePipe.transform(daty.dateRendezVous,'yyyy-MM-dd HH:mm:ss','GMT'), 
              end: this.datePipe.transform(daty.dateFin,'yyyy-MM-dd HH:mm:ss','GMT'), 
              id:daty._id,
              color: this.rdvService.setRdvColor(daty.statut.intitule)
            }) 
          })
          this.calendarOptions.events = rdv;
          this.lesRdv = data;
          this.totalData = response.data.totalDocs;
          this.perPage = response.data.limit; 
        }
      },
      (error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
    return this.lesRdv;
  }

  public annulerRdv(fiche:RendezVous):void {

    this.rdvService.annulationRdv(fiche._id,this.statutRdvAnnulerId).subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {
          console.log(response.data)
          this.afficherFicheModal = false;
          this.submitted = false;
          this.listeRdvClient(null,0,10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
        }
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
  }

  public statutRdvAnnuler(): string {

    this.rdvService.listeStatutRdv().subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {
          this.lesStatutsRdv = response.data;
          this.lesStatutsRdv.forEach(statut => {
            if(statut.intitule === 'Annuler' || statut.intitule === 'annuler' ) {
              this.statutRdvAnnulerId = statut._id
            } 
          })
          
        }
      },
      (error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
    return this.statutRdvAnnulerId;
  }

  public ficheRdv(rendezVousId: string): RendezVous {

    this.rdvService.detailsRdv(rendezVousId).subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {
          console.log(response.data);
          this.fiche = response.data;
          this.dateRdv = new Date(this.datePipe.transform(response.data.dateRendezVous,'yyyy-MM-dd HH:mm:ss','GMT'));
        }
      },
      (error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
    return this.fiche;
  }

  public listeEmploye(): Utilisateur[] {

    this.utilisateurService.listeEmploye().subscribe(
        (response:CustomResponse) => {
            this.employes = response.data;
        },
        (error:HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
    );
    return this.employes;
}

  public updateRdv(rdv:RendezVous): void {
    console.log(rdv)
      const data = {
        personnelId: this.emp,
        dateRendezVous: this.datePipe.transform(this.dateRdv,'yyyy-MM-dd HH:mm:ss','GMT')
      }
      console.log(data)
      this.rdvService.updateRdv(rdv,data).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
            console.log(response.data)
            this.listeRdvClient(null,0,10);
            this.afficherFicheModal = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
          }
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
  }

  ficheLibre(data) {
    this.afficherFicheModal = false;
  }

  modifierLibre(data) {
    alert("Modification du jour libre");
  }

  annulerLibre(data) {
    alert("Annulation du jour libre");
  }
}
